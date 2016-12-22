// searchCache.ts - A simple search cache for Toby which caches YouTube search
//                  results.
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
import * as Moment from "moment";
import { IVideoEntry } from "./infrastructure";

export interface ICacheItem {
  searchTerm: string;
  results: IVideoEntry[];
  addedAt: Moment.Moment;
}

export class SearchCache {
  private cache : ICacheItem[];
  private expiry: number;

  constructor(expiry?: number) {
    this.cache = [];

    if(expiry) {
      this.expiry = expiry;
    } else {
      this.expiry = 10;
    }

    let expiryInterval = setInterval(() => {
      this.runExpire();
    }, this.expiry * 60000);
  }
  private runExpire() : void {
    if(this.cache.length <= 0) return;

    this.cache = _.reject(this.cache, (c) => {
      return c.addedAt < Moment().subtract(this.expiry, "minutes");
    });
  }
  addItem(searchTerm : string, results : IVideoEntry[]) {
    let found = _.find(this.cache, { searchTerm: searchTerm });

    if(!found) {
      this.cache.push({
        searchTerm: searchTerm,
        results: results,
        addedAt: Moment()
      });
    }
  }
  inCache(searchTerm : string) : boolean {
    const result = _.find(this.cache, { searchTerm: searchTerm });

    if(result) return true;

    return false;
  }
}
