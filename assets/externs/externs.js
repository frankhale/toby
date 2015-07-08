// NOTE: These may or may not be totally correct. They are working for me as is.

// various globals that refer to ElectronJS and third party libraries
var app,
    fs,
    path,
    process,
    remote,
    shell,
    CrashReporter,
    BrowserWindow,
    Socket,
    YT,
    _;

// ElectronJS: app
app.on = function(eventName, event) {};
app.quit = function() {};
app.getPath = function(path) {};
app.getVersion = function() {};
app.getName = function() {};

// io.js: process
process.cwd = function() {};

// io.js: fs
fs.readFileSync = function(path) {};
fs.watchFile = function(path, func) {};
fs.writeFile = function(filename, data, callback) {};

// io.js: path
path.sep = function() {};

// io.js: shell
shell.openExternal = function(url) {};

// ElectronJS: remote
remote.getCurrentWindow = function() {};

// ElectronJS: CrashReporter
CrashReporter.start = function(opts) {};

// ElectronJS:  BrowserWindow
BrowserWindow.loadUrl = function(url) {};
BrowserWindow.on = function(eventName, callback) {};
BrowserWindow.openDevTools = function() {};
BrowserWindow.closeDevTools = function() {};
BrowserWindow.toggleDevTools = function() {};
BrowserWindow.reload = function() {};
BrowserWindow.getContentSize = function() {};
BrowserWindow.setTitle = function(title) {};

// YouTube API
YT.Player = function(elem, opts) {};
YT.Player.loadVideoById = function(id) {};
YT.Player.getVideoData = function() {};

var videoData = {
  "video_id": "",
  "author": "",
  "title": "",
  "cpn": "",
  "isLive": false
};

// Socket.IO
Socket.on = function(eventName, callback) {};
Socket.listen = function(port) {};
Socket.emit = function(message) {};

// lodash (assumes attaching to _)

_.filter = function(coll, predicate) {};
_.flatten = function(coll) {};
_.pluck = function(coll, key) {};
_.forEach = function(coll, func) {};
_.where = function(coll, source) {};
_.find = function(coll, predicate) {};
_.sortBy = function(coll, identity) {};
_.take = function(coll, num) {};
_.takeRight = function(coll, num) {};

// JavaScript

String.prototype.includes = function(searchString, position) {};
String.prototype.startsWith = function(searchString, position) {};
String.prototype.endsWith = function(searchString, position) {};

// Toby specific

var videoInfo = {
  "description": "",
  "ytid": ""
};

var videoGroup = {
  "title": "",
  "videos": []
};

var videoDataFile = {
  "groups": [],
  "videos": []
}
