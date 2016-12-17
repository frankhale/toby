// dropdown-ui.tsx
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

export interface IDropDownItem {
  name: string;
  value: string;
  action(): void;
}

interface IDropDownProps {
  name: string,
  items: IDropDownItem[],
  onDropDownChange?: (value: string, id: JQuery) => void;
  disabled?: boolean;
  selected?: string;
  style?: {}
  className?: string
}

interface IDropDownState {
  name?: string,
  items?: IDropDownItem[],
  onDropDownChange?: (value: string, id: JQuery) => void;
  disabled?: boolean;
}

export class DropDown extends React.Component<IDropDownProps, IDropDownState> {
  constructor() {
    super();

    this.onDropDownChange = this.onDropDownChange.bind(this);

    this.state = {
      name: "",
      items: []
    };
  }
  componentDidMount() {
    this.processProps(this.props);
  }
  componentWillReceiveProps(nextProps: IDropDownProps) {
    this.processProps(nextProps);
  }
  onDropDownChange(e: any) {
    if(this.state.onDropDownChange !== undefined) {
      this.state.onDropDownChange(e.target.value, $(e.target).prop("id"));
    }
  }
  processProps(props: IDropDownProps) {
    if(props.name !== undefined && props.items !== undefined) {
      this.setState({
        name: props.name,
        items: props.items,
        disabled: (props.disabled === undefined) ? false : true,
        onDropDownChange: (props.onDropDownChange !== undefined) ? props.onDropDownChange : () => {}
      });
    }
  }
  render() {
    let renderedItems =  this.state.items.map((e : any, i) => {      
      if(e.selected || (this.props.selected !== undefined && this.props.selected === e.name)) {
        return <option key={i} value={e.value} selected>{e.name}</option>
      } else {
        return <option key={i} value={e.value}>{e.name}</option>
      }
    });

    return (
      <select id={this.state.name}
              name={this.state.name}
              onChange={this.onDropDownChange}
              style={(this.props.style !== undefined) ? this.props.style : {}}
              className={(this.props.className !== undefined) ? this.props.className : ""}
              disabled={this.state.disabled}>
        {renderedItems}
      </select>
    );
  }
}