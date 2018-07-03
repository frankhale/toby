// youtube.tsx - YouTube player React component for Toby
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
import YouTubePlayer from "youtube-player";

// interface IYouTubePlayerAPI {
//   loadVideoById(string): void;
//   cueVideoById(string): void;
//   playVideo(): void;
// }

interface IYouTubeProps {
  id: string;
  ytid: string;
}

interface IYouTubeState {
  playerId?: string;
  player?: {}; //IYouTubePlayerAPI;
}

export default class YouTube extends React.Component<IYouTubeProps, IYouTubeState> {
  state = {
    player: null
  };

  componentDidMount() {
    this.setState({
      player: YouTubePlayer(this.props.id, {
        videoId: this.props.ytid,
        playerVars: {
          autoplay: 1,
          iv_load_policy: 3
        }
      }) //as IYouTubePlayerAPI
    });
  }
  render() {
    return <div id={this.props.id} />;
  }
}
