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

const API = ((db) => {

  const appTitle = "Toby - A Simple YouTube Player",
        maxSearchResults = 25,
        maxRecentlyPlayedVideos = 30,
        youtubeSearchOpts = {
          maxResults: maxSearchResults,
          key: "AIzaSyB7AFwYCoI6ypTTSB2vnXdOtAe4hu5nP1E",
          type: "video"
        };

  const _ = require("lodash"),
        express = require("express"),
        router = express.Router(),
        PEG = require("pegjs"),
        fs = require("fs"),
        youtubeSearch = require("youtube-search"),
        validator = require("validator"),
        path = require("path"),
        dataPath = `${__dirname}${path.sep}..${path.sep}data`,
        dataFilePath = `${dataPath}${path.sep}data.txt`,
        dataParser = PEG.generate(fs.readFileSync(`${dataPath}${path.sep}data-grammar.txt`, "utf8"));

  function createDataFileString(data) {
    let results = [];

    _.forEach(data, (group) => {
      results.push(`${group.group} {`);

      _.forEach(group.entries, (entry) => {
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
      fs.writeFileSync(dataFilePath, dataString, "utf8");
    } catch (e) {
      console.log(`Error writing data file: ${e}`);
    }
  }

  db.importIntoDB(readDataFile(dataFilePath));

  fs.watch(dataFilePath, (event, filename) => {
    db.importIntoDB(readDataFile(dataFilePath));
  });

  // API Routes

  router.get("/app/title", (req, res, next) => {
    res.json({
      title: appTitle
    });
  });

  router.get("/videos", (req, res, next) => {
    db.getAllVideosFromDB((data) => {
      res.json(data);
    });
  });

  router.get("/videos/groups", (req, res, next) => {
    db.getAllGroupsFromDB((data) => {
      res.json(data);
    });
  });

  router.post("/videos/search", (req, res, next) => {
    let searchTerm = req.body.searchTerm;

    if (searchTerm.startsWith("/yt")) {
      searchTerm = searchTerm.replace("/yt", "");

      youtubeSearch(searchTerm, youtubeSearchOpts, (err, results) => {
        if (err) return console.log(err);

        db.getVideosWhereTitleLikeFromDB(searchTerm, (localData) => {
          var finalResults = [];

          //console.log(localData);

          _.forEach(results, (r) => {
            let found = _.find(localData, { "ytid": r.id });

            finalResults.push({
              title: r.title,
              ytid: r.id,
              group: r.group,
              isArchived: (found !== undefined) ? true : false
            });
          });

          res.json(finalResults);
        });
      });
    } else if (searchTerm.startsWith("/g")) {
      searchTerm = searchTerm.replace("/g", "").trim();

      if (searchTerm === "all") {
        db.getAllVideosFromDB((data) => {
          res.json(data);
        });
      } else {
        db.getAllVideosForGroupFromDB(searchTerm, (data) => {
          res.json(data);
        });
      }
    } else {
      db.getVideosWhereTitleLikeFromDB(searchTerm, (data) => {
        res.json(data);
      });
    }
  });

  router.post("/videos/add", (req, res, next) => {
    let _videoData = [],
        title = req.body.title,
        ytid = req.body.ytid,
        group = req.body.group;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0 &&
       group !== undefined && group.length > 0) {
      db.addVideoToDB(title, ytid, group);

      res.json({
        success: true
      });
    } else {
      res.json({
        success: false
      });
    }
  });

  router.post("/videos/delete", (req, res, next) => {
    let _videoData = [],
        ytid = req.body.ytid;

    if(ytid !== undefined && ytid.length > 0) {
      db.deleteVideoFromDB(ytid);

      res.json({
        success: true
      });
    } else {
      res.json({
        success: true
      });
    }
  });

  router.post("/videos/update", (req, res, next) => {
    let _videoData = [],
        title = req.body.title,
        ytid = req.body.ytid,
        group = req.body.group;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0 &&
       group !== undefined && group.length > 0) {
      db.updateVideoFromDB(title, ytid, group);

      res.json({
        success: true
      });
    } else {
      res.json({
        success: false
      });
    }
  });

  router.post("/videos/recently-played/add", (req, res, next) => {
    let title = req.body.title,
        ytid = req.body.ytid;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0) {

      // Recently Played is the last 30 (by default) videos played

      // get all of the recently played videos
      db.getAllVideosForGroupFromDB("Recently Played", (data) => {
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
          db.addVideoToDB(title, ytid, "Recently Played");

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

  router.post("/videos/recently-played/search", (req, res, next) => {
    let searchTerm = req.body.searchTerm;

    if(searchTerm !== undefined && searchTerm.length > 0) {
      db.getVideosFromGroupWhereTitleLikeFromDB(searchTerm, "Recently Played", (data) => {
        res.json(data);
      });
    } else {
      res.json([]);
    }
  });

  router.post("/videos/recently-played/last30", (req, res, next) => {
    let trim = false;
    if(req.body.trim !== undefined) {
      trim = req.body.trim;
    }

    // This is going to trim the recently played rows down to the max number
    // which defaults to 30
    db.getAllVideosForGroupFromDB("Recently Played", (data) => {
      // take top 30
      let top30RecentlyPlayed = _.takeRight(_.uniqBy(data, "ytid"), maxRecentlyPlayedVideos);

      //console.log(`before: ${data.length}`);
      //console.log(`after: ${top30RecentlyPlayed.length}`);

      if(req.body.trim) {
        console.log("Trimming the Recently Played group");
        // delete all recently played from db
        db.deleteRecentlyPlayedVideosFromDB();
        // add trimmed recently played back to DB
        _.forEach(top30RecentlyPlayed, (rp) => {
          db.addVideoToDB(rp.title, rp.ytid, "Recently Played");
        });
      }

      res.json(top30RecentlyPlayed);
    });
  });

  router.get("/videos/archive", (req, res, next) => {
    db.getAllGroupsFromDB((groups) => {
      db.getAllVideosOrderedByGroupDB((data) => {
        let results = [];

        _.forEach(groups, (g) => {
          let entries = _.sortBy(_.filter(data, { "group": g.group }), ["title"]);

          entries = _.map(entries, (e) => {
            return {
              title: e.title.replace(/[^\x00-\x7F]/g, ""),
              ytid: e.ytid
            };
          });

          results.push({
            group: g.group,
            entries: entries
          });
        });

        let dataFileString = createDataFileString(results);
        writeDataFile(dataFilePath, dataFileString);

        res.send(dataFileString);
      });
    });
  });

  return router;
});

module.exports = API;
