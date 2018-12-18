// version-ui.tsx - Version info React component for Toby
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

import * as React from "react";
import * as _ from "lodash";

export interface IVersionProps {
  display: boolean;
  info: string;
}

interface IVersionState {
  display: boolean;
  info: string;
}

export class Version extends React.Component<IVersionProps, IVersionState> {
  constructor(props: IVersionProps) {
    super(props);

    this.state = {
      display: false,
      info: ""
    };
  }

  static getDerivedStateFromProps(
    props: IVersionProps,
    state: IVersionState
  ): IVersionState {
    if (props.display !== undefined && !_.isEmpty(props.info)) {
      return {
        display: props.display,
        info: props.info
      };
    }

    return null;
  }

  render() {
    if (this.state.display && !_.isEmpty(this.state.info)) {
      return <div id="version">{this.state.info}</div>;
    }

    return null;
  }
}
