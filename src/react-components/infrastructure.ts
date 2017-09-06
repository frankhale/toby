// infrastructure.ts - Miscellaneous interfaces and/or other things needed by
//                     multiple files in Toby
// Author(s): Frank Hale <frankhale@gmail.com>
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

export interface IVideoGroup {
  group: string;
  entries: IVideoEntry[];
}

export interface IVideoEntry {
  title: string;
  ytid: string;
  group?: string;
  isArchived?: boolean;
  justAdded?: boolean;
}

export interface ITobyVersionInfo {
  title: string;
  version: string;
}

export interface ISearchResults {
  playVideo: (video: IVideoEntry, data: IVideoGroup[]) => void;
  title: string;
  ytid: string;
  group: string;
  thumbnail: string;
  isArchived: boolean;
  justAdded?: boolean;
}
