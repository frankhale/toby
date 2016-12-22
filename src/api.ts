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

import * as _ from "lodash";
import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";

import * as youtubeSearch from "youtube-search";

import { IVideoGroup, IVideoEntry } from "./infrastructure";
import { ICacheItem, SearchCache } from "./searchCache";

import AppConfig from "./config";
import DB from "./db";
import DefaultData from "./data"

interface APIRoute {
  path : string,
  route : (req : express.Request, res : express.Response) => void
}

export default class API {
  private db : DB;
  private server : http.Server;
  private routes : APIRoute[];
  private cache : SearchCache;
  public router : express.Router;

  constructor(db : DB, server : http.Server) {
    this.db = db;
    this.router = express.Router();
    this.server = server;
    this.cache = new SearchCache();

    this.routes = [
      { path: "GET /videos", route: this.getVideos },
      { path: "GET /videos/groups", route: this.getVideosGroups },
      { path: "GET /videos/archive", route: this.getVideosArchive },
      { path: "POST /app/close", route: this.postAppClose },
      { path: "POST /videos/youtube/search", route: this.postVideosYouTubeSearch },
      { path: "POST /videos/search", route: this.postVideosSearch },
      { path: "POST /videos/add", route: this.postVideosAdd },
      { path: "POST /videos/delete", route: this.postVideosDelete },
      { path: "POST /videos/update", route: this.postVideosUpdate },
      { path: "POST /videos/recently-played/add", route: this.postVideosRecentlyPlayedAdd },
      { path: "POST /videos/recently-played/search", route: this.postVideosRecentlyPlayedSearch },
      { path: "POST /videos/recently-played/last30", route: this.postVideosRecentlyPlayedLas30 }
    ];

    this.db.importIntoDB(DefaultData.getData());

    this.initializeRoutes();
  }
  private initializeRoutes() : void {
    _.forEach(this.routes, (r) => {
      let routePath = r.path.split(" ");
      this.router[routePath[0].toLowerCase()](routePath[1], r.route.bind(this));
    });
  }
  private createDataFileString(data: IVideoGroup[]): string {
    return JSON.stringify(data, null, 2);
  }
  private writeDataFile(dataFilePath: string, dataString: string): void {
    try {
      fs.writeFileSync(dataFilePath, dataString, "utf8");
    } catch (e) {
      console.log(`Error writing data file: ${e}`);
    }
  }
  private getVideos(req : express.Request, res : express.Response) : void {
    this.db.getAllVideosFromDB((data) => { res.json(data); });
  }
  private getVideosGroups(req : express.Request, res : express.Response) : void {
    this.db.getAllGroupsFromDB((data) => {
      data = _.map(data, (d) => { return d.group; });
      res.json(data);
    });
  }
  private getVideosArchive(req : express.Request, res : express.Response) : void {
    this.db.getAllGroupsFromDB((groups) => {
      this.db.getAllVideosOrderedByGroupDB((data) => {
        let results : IVideoGroup[] = [];

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

        let dataFileString = this.createDataFileString(results);
        this.writeDataFile(AppConfig.dataFilePath, dataFileString);

        res.send(dataFileString);
      });
    });
  }
  private postAppClose(req : Express.Request, res : Express.Response) : void {
    this.db.close();
    this.server.close();
    process.exit(0);
  }
  private postVideosYouTubeSearch(req : express.Request, res : express.Response) : void {
    let searchTerm = req.body.searchTerm;

    if(searchTerm.indexOf("/yt") > -1) {
      searchTerm = searchTerm.replace("/yt", "");
    }

    youtubeSearch(searchTerm, AppConfig.youtubeSearchOpts, (err, results) => {
      if (err) return console.log(err);

      const ytids = _.map(results, (r) => { return r.id; });

      this.db.getAllVideosWhereYTIDInList(ytids, (ytids_found) => {
        let finalResults : IVideoEntry[] = [];

        _.forEach(results, (r) => {
          let found = _.find(ytids_found, { ytid: r.id });

          finalResults.push({
            title: r.title,
            ytid: r.id,
            group: (found) ? found.group : "",
            isArchived: (found) ? true : false
          });
        });

        this.cache.addItem(searchTerm, finalResults);
        res.json(finalResults);
      });
    });
  }
  private postVideosSearch(req : express.Request, res : express.Response) : void {
    let searchTerm = req.body.searchTerm;

    console.log(`searching for ${searchTerm} locally`);

    if (searchTerm.startsWith("/yt")) {
      this.postVideosYouTubeSearch(req, res);
    } else if (searchTerm.startsWith("/group") || searchTerm.startsWith("/g")) {
      searchTerm = _.slice(searchTerm.split(" "), 1).join(" ");

      if (searchTerm === "all") {
        this.db.getAllVideosFromDB((data) => {
          res.json(data);
        });
      } else {
        this.db.getAllVideosForGroupFromDB(searchTerm, (data) => {
          res.json(data);
        });
      }
    } else {
      this.db.getVideosWhereTitleLikeFromDB(searchTerm, (data) => {
        res.json(data);
      });
    }
  }
  private postVideosAdd(req : express.Request, res : express.Response) : void {
        let _videoData = [],
        title = req.body.title,
        ytid = req.body.ytid,
        group = req.body.group;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0 &&
       group !== undefined && group.length > 0) {
      this.db.addVideoToDB(title, ytid, group);

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }
  private postVideosDelete(req : express.Request, res : express.Response) : void {
    let _videoData = [],
        ytid = req.body.ytid;

    if(ytid !== undefined && ytid.length > 0) {
      this.db.deleteVideoFromDB(ytid);

      res.json({ success: true });
    } else {
      res.json({ success: true });
    }
  }
  private postVideosUpdate(req : express.Request, res : express.Response) : void {
    let _videoData = [],
        title = req.body.title,
        ytid = req.body.ytid,
        group = req.body.group;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0 &&
       group !== undefined && group.length > 0) {
      this.db.updateVideoFromDB(title, ytid, group);

      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  }
  private postVideosRecentlyPlayedAdd(req : express.Request, res : express.Response) : void {
    let title = req.body.title,
        ytid = req.body.ytid;

    if(title !== undefined && title.length > 0 &&
       ytid !== undefined && ytid.length > 0) {

      // Recently Played is the last 30 (by default) videos played

      // get all of the recently played videos
      this.db.getAllVideosForGroupFromDB("Recently Played", (data) => {
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
          this.db.addVideoToDB(title, ytid, "Recently Played");

          res.json({ success: true });
        }
      });
    } else {
      res.json({
        success: false,
        message: "title is required but was empty or undefined"
      });
    }
  }
  private postVideosRecentlyPlayedSearch(req : express.Request, res : express.Response) : void {
    let searchTerm = req.body.searchTerm;

    if(searchTerm !== undefined && searchTerm.length > 0) {
      this.db.getVideosFromGroupWhereTitleLikeFromDB(searchTerm, "Recently Played", (data) => {
        res.json(data);
      });
    } else {
      res.json([]);
    }
  }
  private postVideosRecentlyPlayedLas30(req : express.Request, res : express.Response) : void {
    let trim = false;

    if(req.body.trim !== undefined) {
      trim = req.body.trim;
    }

    // This is going to trim the recently played rows down to the max number
    // which defaults to 30
    this.db.getAllVideosForGroupFromDB("Recently Played", (data) => {
      // take top 30
      let top30RecentlyPlayed = _.takeRight(_.uniqBy(data, "ytid"), AppConfig.maxRecentlyPlayedVideos);

      //console.log(`before: ${data.length}`);
      //console.log(`after: ${top30RecentlyPlayed.length}`);

      if(req.body.trim) {
        console.log("Trimming the Recently Played group");
        // delete all recently played from db
        this.db.deleteRecentlyPlayedVideosFromDB();
        // add trimmed recently played back to DB
        _.forEach(top30RecentlyPlayed, (rp) => {
          this.db.addVideoToDB(rp.title, rp.ytid, "Recently Played");
        });
      }

      res.json(top30RecentlyPlayed);
    });
  }
}
