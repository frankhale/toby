// dropdown-ui.js
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

class DropDown extends React.Component {
  constructor() {
    super();

    this.onDropDownChange = this.onDropDownChange.bind(this);

    this.state = {
      name: "",
      onDropDownChange: () => {},
      items: []
    };
  }
  processProps(props) {
    if(props.name !== undefined && props.items !== undefined) {
      this.setState({
        name: props.name,
        items: props.items,
        disabled: (props.disabled === undefined) ? "" : "disabled",
        onDropDownChange: (props.onDropDownChange !== undefined) ? props.onDropDownChange : () => {}
      });
    }
  }
  componentDidMount() {
    this.processProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.processProps(nextProps);
  }
  onDropDownChange(e) {
    if(this.state.onDropDownChange !== undefined) {
      this.state.onDropDownChange(e.target.value, $(e.target).prop("id"));
    }
  }
  render() {
    let renderedItems =  this.state.items.map((e, i) => {      
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
