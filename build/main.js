"use strict";

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

var appTitle = "Toby - A YouTube Player For The Desktop";

var electron = require("electron");
var path = require("path");
var shell = require("shell");

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var globalShortcut = electron.globalShortcut;

var backend = require("./backend.js");

var mainWindow = null;

app.on("window-all-closed", function () {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    title: appTitle,
    icon: "" + app.getAppPath() + path.sep + "images" + path.sep + "t.png",
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

  var cmdShortCut = process.platform == "darwin" ? "Cmd+Alt+I" : "Ctrl+Shift+I";

  globalShortcut.register(cmdShortCut, function () {
    mainWindow.toggleDevTools();
  });

  globalShortcut.register("ctrl+r", function () {
    mainWindow.reloadIgnoringCache();
  });

  backend.init((function () {
    mainWindow.loadURL("http://127.0.0.1:3000");
    mainWindow.webContents.on("did-finish-load", function () {
      mainWindow.show();
      //mainWindow.webContents.openDevTools();
    });
  }).bind(mainWindow), app.getAppPath(), mainWindow);

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
    backend.close();
  });
});
//# sourceMappingURL=main.js.map
