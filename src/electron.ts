///<reference path="../typings/electron.d.ts" />

// We are including the official Electron type definition here because we don't
// explicitly install the Electron package since Toby can run on whatever the
// user wants to use eg. NW.js, Electron or just the web. Additionally
// @types/electron was removed from package.json as it appears to no longer be
// updated and installing it will show an warning when compiling via Grunt.

import * as path from "path";
import { app, BrowserWindow } from "electron";

let mainWindow: Electron.BrowserWindow;

// found an issue with recent versions of electron in that focus would run crazy
// in certain situations.
//
// issue: https://github.com/electron/electron/issues/7655
//
// this command line switch seems to make the problem go away
app.commandLine.appendSwitch("enable-use-zoom-for-dsf", "false");

function createWindow(): void {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    useContentSize: true,
    icon: `${__dirname}${path.sep}..${path.sep}public${path.sep}images${path.sep}toby.png`,
    backgroundColor: "#000",
    width: 640,
    height: 400,
    minWidth: 640,
    minHeight: 400,
    show: false
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
    // mainWindow.webContents.openDevTools();
  });
  mainWindow.on("closed", (e: any) => {
    mainWindow = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
