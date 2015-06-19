var app = require('app');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    title: 'Toby - A YouTube player for the desktop',
    width: 640,
    height: 400,
    icon: __dirname + "\\t.png",
    "web-preferences": {
      webaudio: true,
      plugins: true
    },
    resizable: true
  });

  //mainWindow.openDevTools();

  mainWindow.loadUrl('file://' + __dirname + '/toby.html');
  mainWindow.focus();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
