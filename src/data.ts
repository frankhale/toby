// data.ts - Default data to populate database with
// Copyright (C) 2016-2017 Frank Hale <frankhale@gmail.com>
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
import AppConfig from "./config";
import { IVideoGroup, IVideoEntry } from "./infrastructure";

export default class DefaultData {
  static getData(): IVideoGroup[] {
    if (fs.existsSync(AppConfig.dataFilePath)) {
      // read in the data from the data.json this file is also the same
      // one that is created when using the archive function
      return JSON.parse(fs.readFileSync(AppConfig.dataFilePath).toString());
    } else {
      return [];
    }
  }
}
