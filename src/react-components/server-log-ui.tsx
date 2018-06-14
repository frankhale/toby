// server-log-ui.tsx - Server log React component for Toby
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

export interface IServerLogProps {
  display: boolean;
  log: String[];
}

interface IServerLogState {
  display: boolean;
  log: String[];
}

export class ServerLog extends React.Component<
  IServerLogProps,
  IServerLogState
> {
  constructor(props: IServerLogProps) {
    super(props);

    this.state = {
      display: false,
      log: []
    };
  }

  static getDerivedStateFromProps(
    props: IServerLogProps,
    state: IServerLogState
  ): IServerLogState {
    if (props.display !== undefined && props.log !== undefined) {
      return {
        display: props.display,
        log: props.log
      };
    }

    return null;
  }

  render() {
    if (this.state.display && !_.isEmpty(this.state.log)) {
      return (
        <div>
          {this.state.log.map((l, i) => {
            return <div key={i}>{l}</div>;
          })}
        </div>
      );
    }

    return null;
  }
}
