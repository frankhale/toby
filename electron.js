const path = require("path"),
      { app, BrowserWindow } = require("electron");

let mainWindow;

// Found an issue with recent versions of electron in that focus would run crazy
// in certain situations.
// 
// Issue: https://github.com/electron/electron/issues/7655
//
// This command line switch seems to make the problem go away
app.commandLine.appendSwitch('enable-use-zoom-for-dsf', 'false');

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    icon: `${__dirname}${path.sep}public${path.sep}images${path.sep}toby.png`,
    backgroundColor: "#000",
	  width: 640,
	  height: 400,
    minWidth: 640,
    minHeight: 400,
    show: false
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  });
  mainWindow.on("closed", (e) => {
    mainWindow = null;
  });
});

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
