'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const shell = require("shell");
const io = require("socket.io")(62375);

var mainWindow = null;

io.on('connection', () => { console.log("socket.io connection established..."); });

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    title: "loading...",
    icon: `${app.getAppPath()}/toby.png`,
    autoHideMenuBar: true,
    backgroundColor: "#000",
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

  mainWindow.loadURL('http://localhost:3000');
  mainWindow.webContents.on("did-finish-load", function() {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  });

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

     console.log(url);

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

       io.emit("play-video", {
         url: url,
         ytid: video_id
       });
     }
   });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
