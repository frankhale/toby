// command-input-ui.js
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

class CommandInput extends React.Component {
  constructor() {
    super();
    this.onCommandInputKeyUp = this.onCommandInputKeyUp.bind(this);
    this.onCommandInputChanged = this.onCommandInputChanged.bind(this);

    this.keys = {
      Enter: 13,
      Up: 38,
      Down: 40
    };

    this.state = {
      commandIndex: -1,
      commandsEntered: []
    };
  }
  componentDidMount() {
    // Make sure the command input box width is a consistant width based on the
    // width of the window.
    const $commandText = $("#commandText");

    // this may need to be changed later if I have more rich UI's but basically
    // this will make sure the command input is always focused, hopefully.
    // $(commandText).on("blur", () => {
    //   $commandText.focus();
    // });

    this.setState({ commandText: $commandText });

    function resizeCommandInput() {
      $commandText.width(window.innerWidth - 50);
    }

    resizeCommandInput();

    $(window).resize((e) => {
      resizeCommandInput();
    });
  }
  onCommandInputKeyUp(e) {
    if(e.which === this.keys.Up) {
      let commandIndex = (this.state.commandIndex === -1) ?
                          this.state.commandsEntered.length - 1 :
                          --this.state.commandIndex;

      if(commandIndex < 0) {
        commandIndex = 0;
      }

      this.setState({ commandIndex: commandIndex }, function() {
        this.state.commandText.val(this.state.commandsEntered[commandIndex]);
      });

    } else if (e.which === this.keys.Down) {
      let commandIndex = (this.state.commandIndex === -1) ? 0 : ++this.state.commandIndex;

      if(commandIndex > this.state.commandsEntered.length) {
        commandIndex = this.state.commandsEntered.length;
      }

      this.setState({ commandIndex: commandIndex }, function() {
        this.state.commandText.val(this.state.commandsEntered[commandIndex]);
      });

    } else if(e.which === this.keys.Enter) {
      const textEntered = this.state.commandText.val();
      if(!(textEntered.length > 0)) return;

      this.setState({
        commandsEntered: _.uniq(this.state.commandsEntered.concat([textEntered])),
        commandIndex: -1
      }, function() {
        if(this.props.onKeyEnter !== undefined) {
          this.props.onKeyEnter(textEntered);
        }

        //this.state.commandText.val("");
      });
    }
  }
  onCommandInputChanged(e) {
    const textEntered = this.state.commandText.val();

    if(this.props.onKeyChanged !== undefined) {
      this.props.onKeyChanged(textEntered);
    }
  }
  render() {
    return (
      <div id="commandContainer" className="command-container">
        &gt;<input id="commandText" className="command-input" type="text" onKeyUp={this.onCommandInputKeyUp} onChange={this.onCommandInputChanged} autoFocus placeholder="Search YouTube or your saved videos..." />
      </div>
    );
  }
}
