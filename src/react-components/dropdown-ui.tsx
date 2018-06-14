// dropdown-ui.tsx
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
import * as $ from "jquery";

export interface IDropDownItem {
  name: string;
  value: string;
  action(): void;
}

interface IDropDownProps {
  name: string;
  items: IDropDownItem[];
  onDropDownChange?: (value: string, id: JQuery) => void;
  disabled?: boolean;
  selected?: string;
  style?: {};
  className?: string;
}

interface IDropDownState {
  name?: string;
  items?: IDropDownItem[];
  onDropDownChange?: (value: string, id: JQuery) => void;
  disabled?: boolean;
  selected?: string;
}

export class DropDown extends React.Component<IDropDownProps, IDropDownState> {
  constructor(props: any) {
    super(props);

    this.onDropDownChange = this.onDropDownChange.bind(this);

    this.state = {
      name: "",
      items: []
    };
  }

  static getDerivedStateFromProps(
    props: IDropDownProps,
    state: IDropDownState
  ): IDropDownState {
    if (props.name !== undefined && props.items !== undefined) {
      return {
        name: props.name,
        items: props.items,
        disabled: props.disabled === undefined ? false : true,
        selected: props.selected,
        onDropDownChange:
          props.onDropDownChange !== undefined
            ? props.onDropDownChange
            : () => {}
      };
    }

    return null;
  }

  private onDropDownChange(e: any): void {
    if (this.state.onDropDownChange !== undefined) {
      this.state.onDropDownChange(e.target.value, $(e.target).prop("id"));
    }
  }
  render() {
    let renderedItems = this.state.items.map((e: any, i) => {
      return (
        <option key={i} value={e.value}>
          {e.name}
        </option>
      );
    });

    return (
      <select
        id={this.state.name}
        name={this.state.name}
        onChange={this.onDropDownChange}
        style={this.props.style !== undefined ? this.props.style : {}}
        className={
          this.props.className !== undefined ? this.props.className : ""
        }
        disabled={this.state.disabled}
        value={this.state.selected}
      >
        {renderedItems}
      </select>
    );
  }
}
