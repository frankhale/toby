// command-input-ui.tsx - The command line input component for Toby
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

enum Keys {
  Enter = 13,
  Up = 38,
  Down = 40
}

interface ICommandInputState {
  commandIndex?: number;
  commandsEntered?: string[];
  commandText?: JQuery;
}

export interface ICommandInputProps {
  onKeyEnter?: (event: any) => void;
  onKeyChanged?: (event: any) => void;
  placeHolder: string;
}

export class CommandInput extends React.Component<
  ICommandInputProps,
  ICommandInputState
> {
  constructor(props: any) {
    super(props);

    this.onCommandInputKeyUp = this.onCommandInputKeyUp.bind(this);
    this.onCommandInputChanged = this.onCommandInputChanged.bind(this);

    this.state = {
      commandIndex: -1,
      commandsEntered: []
    };
  }
  componentDidMount() {
    const $commandText = $("#commandText"),
      resizeCommandInput = (): void => {
        $commandText.width(window.innerWidth - 50);
      };

    $(window).resize(e => {
      resizeCommandInput();
    });

    resizeCommandInput();

    this.setState({ commandText: $commandText });
  }
  private onCommandInputKeyUp(e: any): void {
    if (e.which === Keys.Up) {
      let commandIndex =
        this.state.commandIndex === -1
          ? this.state.commandsEntered.length - 1
          : this.state.commandIndex - 1;

      if (commandIndex < 0) {
        commandIndex = 0;
      }

      this.setState({ commandIndex: commandIndex }, () => {
        this.state.commandText.val(this.state.commandsEntered[commandIndex]);
      });
    } else if (e.which === Keys.Down) {
      let commandIndex =
        this.state.commandIndex === -1 ? 0 : this.state.commandIndex + 1;

      if (commandIndex > this.state.commandsEntered.length) {
        commandIndex = this.state.commandsEntered.length;
      }

      this.setState({ commandIndex: commandIndex }, () => {
        this.state.commandText.val(this.state.commandsEntered[commandIndex]);
      });
    } else if (e.which === Keys.Enter) {
      const textEntered = this.state.commandText.val() as string;
      if (!(textEntered.length > 0)) return;

      this.setState(
        {
          commandsEntered: _.uniq(
            this.state.commandsEntered.concat([textEntered])
          ),
          commandIndex: -1
        },
        () => {
          if (this.props.onKeyEnter !== undefined) {
            this.props.onKeyEnter(textEntered);
          }
        }
      );
    }
  }
  private onCommandInputChanged(e: any): void {
    if (this.props.onKeyChanged !== undefined) {
      this.props.onKeyChanged(this.state.commandText.val());
    }
  }
  render() {
    return (
      <div id="commandContainer" className="command-container">
        &gt;<input
          id="commandText"
          className="command-input"
          type="text"
          onKeyUp={this.onCommandInputKeyUp}
          onChange={this.onCommandInputChanged}
          autoFocus
          placeholder={this.props.placeHolder}
        />
      </div>
    );
  }
}
