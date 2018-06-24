// platform.js - Platform specific and boostrap code for Toby
//               platforms: NW.js and Electron
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

import * as stream from "stream";
import { spawn, ChildProcess } from "child_process";
import * as _ from "lodash";
import * as request from "request";
import AppConfig from "./config";

const titleCase = require("title-case");
const pkgJSON = require("../package.json");

class Platform {
  private node: ChildProcess;
  private $webview: HTMLElement;
  private socket: SocketIO.Server;
  private serverLog: string[];
  static bootstrap() {
    return new Platform();
  }
  constructor() {
    // For now we won't worry about building the production copy of the Next.js
    // server. We'll just fire up the dev server until everything is working
    // nicely.
    this.node = spawn(".\\node.exe", ["./server/server.ts"], {
      cwd: process.cwd()
    });
    this.$webview = document.getElementById("webview");
    this.serverLog = [];
    document.title = pkgJSON.title;
    this.socket = require("socket.io")(AppConfig.socketIOPort);
    this.socket.on("connection", s => {
      s.on("get-app-info", () => {
        s.emit("app-info", {
          title: pkgJSON.title,
          version: `${titleCase(pkgJSON.name)}-${pkgJSON.version}`
        });
      });
      s.on("set-document-title", (t: string) => {
        if (t !== undefined && t !== "") {
          document.title = t;
        }
      });
      s.on("get-server-log", () => {
        s.emit("server-log", this.serverLog);
      });
    });

    this.redirectOutput(this.node.stdout);
    this.redirectOutput(this.node.stderr);

    let checkServerRunning = setInterval(() => {
      request(AppConfig.serverURL, (error, response, _body) => {
        if (!error && response.statusCode === 200) {
          this.$webview[0].setAttribute("src", AppConfig.serverURL);
          document.getElementById("loading").style.display = "none";
          this.$webview.style.display = "block";
          clearInterval(checkServerRunning);
        }
      });
    }, 1000);
    this.setup();
  }
  private setup(): void {
    // Here we will instantiate the right class for the platform we are running
    // on. So if we are running on NW.js we'll set that up and vice versa for
    // Electron.
  }
  private strip(s: string): string {
    // regex from: http://stackoverflow.com/a/29497680/170217
    return s.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
  }
  private redirectOutput(x: stream.Readable): void {
    let lineBuffer = "";
    x.on("data", data => {
      lineBuffer += data.toString();
      let lines = lineBuffer.split("\n");
      _.forEach(lines, l => {
        if (l !== "") {
          this.serverLog.push(this.strip(l));
        }
      });
      lineBuffer = lines[lines.length - 1];
    });
  }
}

document.addEventListener("DOMContentLoaded", function(_e) {
  Platform.bootstrap();
});
