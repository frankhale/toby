import * as React from "react";
import ReactDOM from "react-dom";
import * as $ from "jquery";

class ModernUI extends React.Component {
  render() {
    return <div>TODO: Front End Goes Here...</div>;
  }
}

$(document).ready(function() {
  ReactDOM.render(<ModernUI />, document.getElementById("frontEnd") as HTMLElement);
});
