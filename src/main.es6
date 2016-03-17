// main.es6 - The main driver for Electron
// Copyright (C) 2015 Frank Hale <frankhale@gmail.com>
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

const appTitle = "Toby - A YouTube Player For The Desktop";

const electron = require("electron");
const path = require("path");
const shell = require("shell");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

const backend = require("./backend.js");

let socket, mainWindow = null;

app.on("window-all-closed", function() {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    title: appTitle,
    icon: `${app.getAppPath()}${path.sep}images${path.sep}t.png`,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false // we want access to contents of iframe
                         // so we can make changes
    },
	  width: 640,
	  height: 400,
    minWidth: 640,
    minHeight: 400,
    show: false
  });

  var cmdShortCut = (process.platform == "darwin") ? "Cmd+Alt+I" : "Ctrl+Shift+I";

  globalShortcut.register(cmdShortCut, () => {
    mainWindow.toggleDevTools();
  });

  globalShortcut.register("ctrl+r", () => {
    mainWindow.reloadIgnoringCache();
  });

  backend.init(function(io) {
      socket = io;
      mainWindow.loadURL("http://127.0.0.1:62375");
      mainWindow.webContents.on("did-finish-load", function() {
        mainWindow.show();
        //mainWindow.webContents.openDevTools();
      });
    }.bind(mainWindow),
    app.getAppPath(),
    mainWindow
  );

  mainWindow.webContents.on("new-window", function(e, url) {
    e.preventDefault();

    // Looks like we can differentiate between clicking the YouTube icon
    // in the player where we want it to open an external browser and clicking
    // a suggested video link after a video is played.
    //
    // When clicking the YouTube link "time_continue" is present in the url.
    // {url: "https://www.youtube.com/watch?time_continue=1&v=ctrZdbExVrk"}
    //
    // When clicking on a suggested video the link is just an ordinary YouTube
    // video link with video ID.
    // {url: "https://www.youtube.com/watch?v=4nYMdMtGsPo"}

    if(url.includes("time_continue")) {
      shell.openExternal(url);
    } else if(url.includes("?v=")) {
      // the id extraction is almost verbatim from:
      // http://stackoverflow.com/a/3452617/170217
      var video_id = url.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      //------------------------------------------

      socket.emit("play-video", {
        url: url,
        ytid: video_id
      });
    }
  });

  mainWindow.on("closed", function() {
    mainWindow = null;
    backend.close();
  });
});
