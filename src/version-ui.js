// version-ui.js
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

class Version extends React.Component {
  constructor() {
    super();

    this.state = {
      display: false,
      info: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.display !== undefined && nextProps.info !== undefined) {
      this.setState({
        display: nextProps.display,
        info: nextProps.info
      });
    }
  }
  render() {
    if(this.state.display) {
      return <div id="version">{this.state.info}</div>
    } else {
      return <div></div>;
    }
  }
}
