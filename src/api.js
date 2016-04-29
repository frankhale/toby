// api.js - Express API for Toby
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

const API = (function() {

  const appTitle = "Toby - A Simple YouTube Player";
  const maxSearchResults = 25;
  const maxRecentlyPlayedVideos = 30;

  const youtubeSearchOpts = {
    maxResults: maxSearchResults,
    key: "AIzaSyB7AFwYCoI6ypTTSB2vnXdOtAe4hu5nP1E",
    type: "video"
  };

  const _ = require("lodash");
  const express = require("express");
  const router = express.Router();
  const PEG = require("pegjs");
  const fs = require("fs");
  const youtubeSearch = require("youtube-search");
  const shared = require("./shared");
  const dataPath = `${__dirname}/../data`;
  const dataFilePath = `${dataPath}/data.txt`;
  const dataParser = PEG.buildParser(fs.readFileSync(`${dataPath}/data-grammar.txt`, 'utf8'));

  function createDataFileString(data) {
    let results = [];

    _.forEach(data, function(group) {
      results.push(`${group.group} {`);

      _.forEach(group.entries, function(entry) {
        results.push(`\t${entry.title} : ${entry.ytid}`);
      });

      results.push("}\n");
    });

    return results.join("\n");
  }

  function readDataFile(dataFilePath) {
    let dataRaw = fs.readFileSync(dataFilePath, 'utf8');

    try {
      return dataParser.parse(dataRaw);
    } catch (e) {
      console.log(`Error parsing data file: ${e}`);
    }

    return [];
  }

  function writeDataFile(dataFilePath, dataString) {
    try {
      fs.writeFileSync(dataFilePath, dataString, 'utf8');
    } catch (e) {
      console.log(`Error writing data file: ${e}`);
    }
  }

  let videoData = readDataFile(dataFilePath);

  fs.watch(dataFilePath, (event, filename) => {
    videoData = readDataFile(dataFilePath);
  });

  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database(`${dataPath}/videoDB`);

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, ytid  TEXT, [group] TEXT)");

    db.each("SELECT COUNT(*) as count FROM videos", function(err, row) {
      if(row.count === 0) {
        _.forEach(videoData, function(g) {
          _.forEach(g.entries, function(e) {
            db.run("INSERT into videos(title,ytid,[group]) VALUES (?,?,?)", [ e.title, e.ytid, g.group ]);
          });
        });
      }
    });
  });

  function getAllVideosFromDB(finished) {
    db.all("SELECT title, ytid, [group] FROM videos WHERE [group] IS NOT 'Recently Played'", function(err, rows) {
      if(finished !== undefined) {
        var _rows = _.forEach(rows, function(d) {
          d.isArchived = true;
        });

        finished(_rows);
      }
    });
  }

  function getAllVideosOrderedByGroupDB(finished) {
    db.all("SELECT title, ytid, [group] FROM videos ORDER BY [group]", function(err, rows) {
      if(finished !== undefined) {
        finished(rows);
      }
    });
  }

  function getVideoFromDB(ytid, finished) {
    db.get("SELECT title, ytid, [group] FROM videos WHERE ytid = ? AND [group] IS NOT 'Recently Played'", [ytid], function(err, row) {
      if(finished !== undefined) {
        finished(row);
      }
    });
  }

  function getAllGroupsFromDB(finished) {
    db.all("SELECT DISTINCT [group] FROM videos", function(err, rows) {
      if(finished !== undefined) {
        finished(rows);
      }
    });
  }

  function getAllVideosForGroupFromDB(group, finished) {
    db.all("SELECT title, ytid, [group] FROM videos WHERE [group] = ?", [group], function(err, rows) {
      if(finished !== undefined) {
        var _rows = _.forEach(rows, function(d) {
          d.isArchived = true;
        });

        finished(_rows);
      }
    });
  }

  function getVideosWhereTitleLikeFromDB(searchTerm, finished) {
    searchTerm = `%${searchTerm.trim()}%`;

    db.all("SELECT title, ytid, [group] FROM videos WHERE title LIKE (?) AND [group] IS NOT 'Recently Played'", [searchTerm], function(err, rows) {
      if(finished !== undefined) {
        var _rows = _.forEach(rows, function(d) {
          d.isArchived = true;
        });

        finished(_rows);
      }
    });
  }

  function getVideosFromGroupWhereTitleLikeFromDB(searchTerm, group, finished) {
    searchTerm = `%${searchTerm.trim()}%`;

    db.all("SELECT title, ytid, [group] FROM videos WHERE title LIKE ? AND [group] = ?", [searchTerm, group], function(err, rows) {
      if(finished !== undefined) {
        var _rows = _.forEach(rows, function(d) {
          d.isArchived = true;
        });

        finished(_rows);
      }
    });
  }

  function addVideoToDB(title, ytid, group) {
    if(title !== undefined || title !== "" &&
       group !== undefined || group !== "") {
      db.get("SELECT ytid FROM videos WHERE ytid = ? AND [group] = ?", [ytid, group], function(err, rows) {
        if(rows === undefined) {
          console.log(`inserting ${title} into ${group}`);
          db.run("INSERT into videos(title,ytid,[group]) VALUES (?,?,?)", [ title, ytid, group ]);
        }
      });
    }
  }

  function deleteVideoFromDB(ytid) {
    db.get("SELECT ytid FROM videos WHERE ytid = (?)", [ytid], function(err, rows) {
      if(rows !== undefined) {
        db.run("DELETE FROM videos WHERE ytid = (?)", [ytid]);
      }
    });
  }

  function updateVideoFromDB(title, ytid, group) {
    if(title !== undefined || title !== "" &&
       group !== undefined || group !== "") {
        db.get("SELECT ytid FROM videos WHERE ytid = ?", [ytid], function(err, rows) {
          if(rows !== undefined) {
            db.run("UPDATE videos SET title = ?, group = ? WHERE ytid = ?", [title, group, ytid]);
          }
      });
    }
  }

  function deleteRecentlyPlayedVideosFromDB() {
    db.run("DELETE FROM videos WHERE [group] = 'Recently Played'");
  }

  //db.run("INSERT into videos(title,ytid,[group]) VALUES (?,?,?)", [ "TEST", "ag3ZI4nA4IB", "TEST"]);
  // db.run("UPDATE videos SET title = (?), [group] = (?) WHERE ytid = (?)", ["FUCK", "FUCK", "ag3ZI4nA4IB"]);
  // db.get("SELECT * FROM videos WHERE ytid = (?)", ["ag3ZI4nA4IB"], function(err, row) {
  //   console.log(row);
  // });

  // getAllVideosFromDB(function(data) {
  //   console.log(data);
  // });

  // db.all("SELECT * FROM videos WHERE [group] = ?", ["EDM"], function(err, rows) {
  //   console.log(rows);
  // });

  // getVideosWhereTitleLikeFromDB("chris tomlin", function(data) {
  //   console.log(data);
  // });

  // API Routes

  router.get("/videos", (req, res, next) => {
    getAllVideosFromDB(function(data) {
      res.json(data);
    });
  });

  router.get("/videos/groups", (req, res, next) => {
    getAllGroupsFromDB(function(data) {
      res.json(data);
    })
  });

  router.post("/videos/search", (req, res, next) => {
    let searchTerm = req.body.searchTerm;

    if (searchTerm.startsWith("yt:")) {
      searchTerm = searchTerm.replace("yt:", "");

      youtubeSearch(searchTerm, youtubeSearchOpts, function(err, results) {
        if (err) return console.log(err);

        getVideosWhereTitleLikeFromDB(searchTerm, function(localData) {
          var finalResults = [];

          //console.log(localData);

          _.forEach(results, function(r) {
            let found = _.find(localData, { "ytid": r.id });

            finalResults.push({
              title: r.title,
              ytid: r.id,
              isArchived: (found !== undefined) ? true : false
            });
          });

          res.json(finalResults);
        });
      });
    } else if (searchTerm.startsWith("g:")) {
      searchTerm = searchTerm.replace("g:", "").trim();

      if (searchTerm === "all") {
        getAllVideosFromDB(function(data) {
          res.json(data);
        });
      } else {
        getAllVideosForGroupFromDB(searchTerm, function(data) {
          res.json(data);
        });
      }
    } else {
      let results = [];

      getVideosWhereTitleLikeFromDB(searchTerm, function(data) {
        res.json(data);
      });
    }
  });

  //router.get("/videos/raw", (req, res, next) => {
    //res.send(createDataFileString(videoData));
  //});

  router.post("/videos/add", (req, res, next) => {
    let _videoData = [],
        title = req.body.title,
        ytid = req.body.ytid,
        group = req.body.group;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0 &&
       group !== undefined && group.length > 0) {
      addVideoToDB(title, ytid, group);
    }

    res.json({
      success: true
    });
  });

  router.post("/videos/delete", (req, res, next) => {
    let _videoData = [],
        ytid = req.body.ytid;

    if(ytid !== undefined && ytid.length > 0) {
      deleteVideoFromDB(ytid);
    }

    res.json({
      success: true
    });
  });

  router.post("/videos/update", (req, res, next) => {
    let _videoData = [],
        title = req.body.title,
        ytid = req.body.ytid,
        group = req.body.group;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0 &&
       group !== undefined && group.length > 0) {
      updateVideoFromDB(title, ytid, group);
    }

    res.json({
      success: true
    });
  });

  router.post("/videos/recently-played/add", (req, res, next) => {
    let title = req.body.title,
        ytid = req.body.ytid;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0) {

      // Recently Played is the last 30 (by default) videos played

      // get all of the recently played videos
      getAllVideosForGroupFromDB("Recently Played", function(data) {
        // If the video we are trying to add is already in the Recently Played
        // group then we need to exit gracefully...

        if(_.find(data, { "ytid": ytid }) !== undefined) {
          let message = `${ytid} is already in the Recently Played group...`;
          console.log(message);
          res.json({
            success: false,
            message: message
          });
        } else {
          addVideoToDB(title, ytid, "Recently Played");

          // add new recently played video
          // data.push({
          //   title: title,
          //   ytid: ytid
          // });

          // take top 30
          //let top30RecentlyPlayed = _.takeRight(data, numberOfMaxRecentlyPlayedVideos);

          //console.log(`before: ${data.length}`);
          //console.log(`after: ${top30RecentlyPlayed.length}`);

          // delete all recently played from db
          //deleteRecentlyPlayedVideosFromDB();

          // add recently played back to DB
          //_.forEach(top30RecentlyPlayed, function(rp) {
          //  addVideoToDB(rp.title, rp.ytid, "Recently Played");
          //});

          res.json({
            success: true
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: "title is required but was empty or undefined"
      });
    }
  });

  router.get("/videos/recently-played/search", (req, res, next) => {
    let searchTerm = req.body.searchTerm;

    this.getVideosFromGroupWhereTitleLikeFromDB(searchTerm, "Recently Played", function(data) {

      let recentlyPlayedWithQuota = _.takeRight(data, maxRecentlyPlayedVideos);

      console.log(data);
      console.log(recentlyPlayedWithQuota);

      console.log(data.length);
      console.log(recentlyPlayedWithQuota.length);

      res.json(recentlyPlayedWithQuota);
    })
  });

  router.post("/videos/recently-played/trim", (req, res, next) => {
    
  });

  router.get("/videos/archive", (req, res, next) => {
    getAllGroupsFromDB(function(groups) {
      getAllVideosOrderedByGroupDB(function(data) {
        let results = [];

        _.forEach(groups, function(g) {
          results.push({
            group: g.group,
            entries: _.sortBy(_.filter(data, { "group": g.group }), ["title"])
          });
        });

        let dataFileString = createDataFileString(results);
        writeDataFile(dataFilePath, dataFileString);

        res.send(dataFileString);
      });
    });
  });

  return {
    router: router,
    close: () => { db.close(); }
  };
})();

module.exports = API;
