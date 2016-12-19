// config.js - App configuration information
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

import * as fs from "fs";
import * as path from "path";
import * as youtubeSearch from "youtube-search";

export default class AppConfig {
  static serverPort = "62374";
  static socketIOPort = "62375";
  static serverURL = `http://localhost:${AppConfig.serverPort}`;  
  static maxSearchResults = 30;
  static maxRecentlyPlayedVideos = 30;
  static youtubeSearchOpts : youtubeSearch.YouTubeSearchOptions = {
    maxResults: AppConfig.maxSearchResults,
    key: "AIzaSyB7AFwYCoI6ypTTSB2vnXdOtAe4hu5nP1E",
    type: "video"
  };
  static dataPath = `${__dirname}${path.sep}..${path.sep}data`;
  static dataFilePath = `${AppConfig.dataPath}${path.sep}data.txt`;
}