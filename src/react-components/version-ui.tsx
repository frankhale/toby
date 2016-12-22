// version-ui.tsx - Version info React component for Toby
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

import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IVersionProps {
  display: boolean;
  info: string;
}

interface IVersionState {
  display: boolean;
  info: string;
}

export class Version extends React.Component<IVersionProps, IVersionState> {
  constructor() {
    super();

    this.state = {
      display: false,
      info: ""
    };
  }
  componentWillReceiveProps(nextProps: IVersionProps) {
    if (nextProps.display !== undefined && nextProps.info !== undefined) {
      this.setState({
        display: nextProps.display,
        info: nextProps.info
      });
    }
  }
  render() {
    if (this.state.display && this.state.info !== "") {
      return <div id="version">{this.state.info}</div>;
    }

    return null;
  }
}