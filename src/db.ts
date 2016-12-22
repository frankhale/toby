// db.ts - Database API for Toby
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

import * as sqlite3 from "sqlite3";
import * as path from "path";
import * as _ from "lodash";

import AppConfig from "./config";
import { IVideoGroup, IVideoEntry } from "./infrastructure";

export default class DB {
  private db: sqlite3.Database;

  constructor() {
    sqlite3.verbose();
    this.db = new sqlite3.Database(`${AppConfig.dataPath}${path.sep}videoDB`);
  }
  importIntoDB(videoData: IVideoGroup[]): void {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, ytid  TEXT, [group] TEXT)");

      this.db.each("SELECT COUNT(*) as count FROM videos", (err, row) => {
        _.forEach(videoData, (g: IVideoGroup) => {
          _.forEach(g.entries, (e) => {
            this.getVideoFromDB(e.ytid, (row) => {
              if (row === undefined && g.group !== "Recently Played") {
                console.log(`importing ${e.title} | ${g.group}`);
                this.db.run("INSERT into videos(title,ytid,[group]) VALUES (?,?,?)", [e.title, e.ytid, g.group]);
              }
            });
          });
        });
      });
    });
  }
  getAllYTIDsFromDB(finished: (rows: any[]) => void): void {
    this.db.all("SELECT title, ytid, [group] FROM videos WHERE [group] IS NOT 'Recently Played'", (err, rows) => {
      if (finished !== undefined) {
        let ytids : string[] = [];

        _.forEach(rows, (d) => {
          ytids.push(d.ytid);
        });

        finished(ytids);
      }
    });
  }
  getAllVideosFromDB(finished: (rows: any[]) => void): void {
    this.db.all("SELECT title, ytid, [group] FROM videos WHERE [group] IS NOT 'Recently Played'", (err, rows) => {
      if (finished !== undefined) {
        let _rows = _.forEach(rows, (d) => {
          d.isArchived = true;
        });

        finished(_rows);
      }
    });
  }
  getAllVideosOrderedByGroupDB(finished: (rows: any[]) => void): void {
    this.db.all("SELECT title, ytid, [group] FROM videos ORDER BY [group]", (err, rows) => {
      if (finished !== undefined) {
        finished(rows);
      }
    });
  }
  getVideoFromDB(ytid: string, finished: (row: any) => void): void {
    this.db.get("SELECT title, ytid, [group] FROM videos WHERE ytid = ? AND [group] IS NOT 'Recently Played'", [ytid], (err, row) => {
      if (finished !== undefined) {
        finished(row);
      }
    });
  }
  getAllGroupsFromDB(finished: (rows: any[]) => void): void {
    this.db.all("SELECT DISTINCT [group] FROM videos", (err, rows) => {
      if (finished !== undefined) {
        finished(rows);
      }
    });
  }
  getAllVideosWhereYTIDInList(ytids : string[], finished: (rows: any[]) => void) : void {
    let ytids_in_string = _.map(ytids, (r) => { return `'${r}'`; }).join(",");

    this.db.all(`SELECT title, ytid, [group] FROM videos WHERE [group] IS NOT 'Recently Played' AND ytid IN (${ytids_in_string})`, (err, ytids_found) => {
      finished(ytids_found);
    });
  }
  getAllVideosForGroupFromDB(group: string, finished: (rows: any[]) => void): void {
    this.db.all("SELECT title, ytid, [group] FROM videos WHERE [group] = ?", [group], (err, rows) => {
      if (finished !== undefined) {
        let ytids = _.map(rows, (r) => { return r.ytid; }),
          ytids_in_string = _.map(ytids, (r) => { return `'${r}'`; }).join(",");

        this.db.all(`SELECT ytid FROM videos WHERE [group] IS NOT 'Recently Played' AND ytid IN (${ytids_in_string})`, (err, ytids_found) => {
          let _ytids = _.map(ytids_found, (r) => { return r.ytid; }),
            _rows = _.forEach(rows, (d) => {
              d.isArchived = (_.indexOf(_ytids, d.ytid) !== -1) ? true : false
            });

          finished(_rows);
        });
      }
    });
  }
  getVideosWhereTitleLikeFromDB(searchTerm: string, finished: (rows: any[]) => void): void {
    searchTerm = `%${searchTerm.trim()}%`;

    this.db.all("SELECT title, ytid, [group] FROM videos WHERE title LIKE (?) AND [group] IS NOT 'Recently Played'", [searchTerm], (err, rows) => {
      if (finished !== undefined) {
        let _rows = _.forEach(rows, (d) => {
          d.isArchived = true;
        });

        finished(_rows);
      }
    });
  }
  getVideosFromGroupWhereTitleLikeFromDB(searchTerm: string, group: string, finished: (rows: any[]) => void): void {
    searchTerm = `%${searchTerm.trim()}%`;

    this.db.all("SELECT title, ytid, [group] FROM videos WHERE title LIKE ? AND [group] = ?", [searchTerm, group], (err, rows) => {
      if (finished !== undefined) {
        var _rows = _.forEach(rows, (d) => {
          d.isArchived = true;
        });

        finished(_rows);
      }
    });
  }
  addVideoToDB(title: string, ytid: string, group: string): void {
    if (title !== undefined || title !== "" && group !== undefined || group !== "") {
      this.db.get("SELECT ytid FROM videos WHERE ytid = ? AND [group] = ?", [ytid, group], (err, rows) => {
        if (rows === undefined) {
          console.log(`inserting ${title} into ${group}`);
          this.db.run("INSERT into videos(title,ytid,[group]) VALUES (?,?,?)", [title, ytid, group]);
        }
      });
    }
  }
  deleteVideoFromDB(ytid : string) : void {
    this.db.get("SELECT ytid FROM videos WHERE ytid = (?)", [ytid], (err, rows) => {
      if(rows !== undefined) {
        this.db.run("DELETE FROM videos WHERE ytid = (?)", [ytid]);
      }
    });
  }
  updateVideoFromDB(title : string, ytid : string, group : string) : void {
    if(title !== undefined || title !== "" && group !== undefined || group !== "") {
        this.db.get("SELECT ytid FROM videos WHERE ytid = ?", [ytid], (err, rows) => {
          if(rows !== undefined) {
            this.db.run("UPDATE videos SET title = ?, group = ? WHERE ytid = ?", [title, group, ytid]);
          }
      });
    }
  }
  deleteRecentlyPlayedVideosFromDB() : void {
    this.db.run("DELETE FROM videos WHERE [group] = 'Recently Played'");
  };
  close(): void {
    this.db.close();
  }
}
