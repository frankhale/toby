"use strict";

// backend.es6 - Backend code for Toby
// Copyright (C) 2016 Frank Hale <frankhale@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var backend = (function () {

  var _ = require("lodash");
  var path = require("path");
  var express = require("express");
  var favicon = require("serve-favicon");
  var logger = require("morgan");
  var cookieParser = require("cookie-parser");
  var bodyParser = require("body-parser");
  var expressApp = express();
  var debug = require("debug")("express-test:server");
  var http = require("http");
  var port = normalizePort(process.env.PORT || "3000");
  var PEG = require("pegjs");
  var fs = require("fs");
  var youtubeSearch = require("youtube-search");

  var server = undefined,
      onReady = undefined,
      dataParser = undefined,
      browser = undefined,
      appPath = undefined;
  var defaultWindowTitle = "";
  var videoDataPath = "";
  var videoData = [];
  var numberOfMaxRecentlyPlayedVideos = 30;

  var youtubeSearchOpts = {
    maxResults: 25,
    key: "AIzaSyB7AFwYCoI6ypTTSB2vnXdOtAe4hu5nP1E",
    type: "video"
  };

  _.mixin({
    'pluckMany': function pluckMany(data, columns) {
      return _.map(data, _.partialRight(_.pick, columns));
    },
    'findByValues': function findByValues(collection, property, values) {
      return _.filter(collection, function (item) {
        return _.contains(values, item[property]);
      });
    }
  });

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);

    if (onReady !== undefined || onReady !== null) {
      onReady();
    }
  }

  function createDataFileString(data) {
    var results = [];

    _.forEach(data, function (group) {
      results.push(group.group + " {");

      _.forEach(group.entries, function (entry) {
        results.push("\t" + entry.title + " : " + entry.ytid);
      });

      results.push("}\n");
    });

    return results.join("\n");
  }

  function readDataFile() {
    var dataRaw = fs.readFileSync(videoDataPath, 'utf8');

    try {
      videoData = dataParser.parse(dataRaw);
    } catch (e) {
      console.log("Error parsing data file: " + e);
    }
  }

  function writeDataFile(dataString) {
    try {
      fs.writeFileSync(videoDataPath, dataString, 'utf8');
    } catch (e) {
      console.log("Error writing data file: " + e);
    }
  }

  function initRoutes(appPath) {
    expressApp.get("/", function (req, res, next) {
      res.render('index', {
        title: defaultWindowTitle
      });
    });

    expressApp.get("/api/data", function (req, res, next) {
      res.json(videoData);
    });

    expressApp.get("/api/search/:term", function (req, res, next) {
      var searchTerm = decodeURIComponent(req.params.term);
      var flattenedVideos = _.flatten(_.pluckMany(videoData, ["entries"]).map(function (x) {
        return x.entries;
      }));
      //console.log(`searchTerm (backend) = ${searchTerm}`);

      if (searchTerm.startsWith("yt:")) {
        searchTerm = searchTerm.replace("yt:", "").trim().toLowerCase();

        youtubeSearch(searchTerm, youtubeSearchOpts, function (err, results) {
          if (err) return console.log(err);

          var finalResults = [];

          _.forEach(results, function (r) {
            finalResults.push({
              title: r.title,
              ytid: r.id
            });
          });

          res.json(finalResults);
        });
      } else if (searchTerm.startsWith("g:")) {
        searchTerm = searchTerm.replace("g:", "").trim().toLowerCase();

        if (searchTerm === "all") {
          res.json(flattenedVideos);
        } else {
          var group = _.find(videoData, function (g) {
            return g.group.toLowerCase() === searchTerm;
          });
          res.json(group !== undefined ? group.entries : []);
        }
      } else {
        (function () {
          var results = [];

          var groupsWithoutRecentlyPlayed = _.filter(videoData, function (g) {
            return g.group.toLowerCase() !== "recently played";
          });

          var videosWithoutRecentlyPlayed = _.flatten(_.pluckMany(groupsWithoutRecentlyPlayed, ["entries"]).map(function (x) {
            return x.entries;
          }));

          _.forEach(videosWithoutRecentlyPlayed, function (v) {
            if (v.title.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) > -1) {
              results.push(v);
            }
          });
          res.json(results);
        })();
      }
    });

    // expressApp.get("/api/getDataFileString", (req, res, next) => {
    //   res.json({
    //     dataFileString: createDataFileString(videoData)
    //   });
    // });

    expressApp.post("/api/add", function (req, res, next) {
      var result = {};

      if (req.body.title !== undefined && req.body.title.length > 0 && req.body.ytid !== undefined && req.body.ytid.length > 0) {
        result.title = req.body.title;
        result.ytid = req.body.ytid;

        var group = "misc";
        if (req.body.group !== undefined || req.body.group.length > 0) {
          group = req.body.group;
        }

        var flattenedVideos = _.flatten(_.pluckMany(videoData, ["entries"]).map(function (x) {
          return x.entries;
        }));
        var foundVideo = _.find(flattenedVideos, {
          "ytid": req.body.ytid
        });

        if (!foundVideo || group.toLowerCase() === "recently played") {
          var foundGroup = _.find(videoData, {
            "group": group
          });
          if (foundGroup === undefined) {
            videoData.push({
              group: group,
              entries: []
            });
            foundGroup = _.find(videoData, {
              "group": group
            });
          }

          result.status = req.body.title + " added";

          foundGroup.entries.push({
            title: req.body.title.replace(":", ""), // TODO: we need a more strict replace here...
            // colons will fuck shit up! There are other
            // chars that will trip the parser as well
            ytid: req.body.ytid
          });

          if (group.toLowerCase() === "recently played") {
            // trim to 30 video entries
            foundGroup = _.takeRight(_.uniq(foundGroup), numberOfMaxRecentlyPlayedVideos);
          }

          writeDataFile(createDataFileString(videoData));
        } else {
          result.status = req.body.title + " already in data file";
        }
      } else {
        result.status = "title and ytid are required and cannot be empty";
      }

      res.json(result);
    });

    expressApp.post("/api/title", function (req, res, next) {
      if (req.body.title !== "") {
        browser.setTitle(req.body.title);
      }

      res.json({
        status: "title changed",
        title: req.body.title
      });
    });

    expressApp.post("/api/resetWindowTitleToDefault", function (req, res, next) {
      browser.setTitle(defaultWindowTitle);

      res.json({
        status: "title changed",
        title: defaultWindowTitle
      });
    });
  }

  function init(onReadyCallback, appPath, currentWindow) {
    onReady = onReadyCallback;
    this.appPath = appPath;
    videoDataPath = appPath + "/data/data.txt";
    dataParser = PEG.buildParser(fs.readFileSync(appPath + "/data/data-grammar.txt", 'utf8'));
    browser = currentWindow;
    defaultWindowTitle = browser.getTitle();

    readDataFile();

    // view engine setup
    expressApp.set('views', path.join(appPath, 'views'));
    expressApp.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(app.getAppPath(), 'public', 'favicon.ico')));
    expressApp.use(logger('dev'));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({
      extended: false
    }));
    expressApp.use(cookieParser());
    expressApp.use(express.static(path.join(appPath, 'public')));
    expressApp.set('port', port);

    fs.watch(videoDataPath, function (event, filename) {
      readDataFile();
    });

    initRoutes(appPath);

    expressApp.use(function (req, res, next) {
      var err = new Error("Not Found : " + req.path);
      err.status = 404;
      next(err);
    });

    // development error handler
    // will print stacktrace
    if (expressApp.get('env') === 'development') {
      expressApp.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    expressApp.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    server = http.createServer(expressApp);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  }

  function close() {
    server.close();
  }

  return {
    init: init,
    close: close
  };
})();

module.exports = backend;
//# sourceMappingURL=backend.js.map
