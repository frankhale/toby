//
// Toby - A YouTube player for the desktop
//
// Frank Hale <frankhale@gmail.com>
// 16 July 2015
//
// License: GNU GPL v2
//
var app,
    fs,
    path,
    process,
    remote,
    shell,
    CrashReporter,
    BrowserWindow,
    globalShortcut,
    Socket,
    YT,
    _;

// ElectronJS: app
app.on = function(eventName, event) {};
app.quit = function() {};
app.getPath = function(path) {};
app.getVersion = function() {};
app.getName = function() {};
app.commandLine.appendSwitch = function(switch_, value) {};

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
remote.require = function(module) {};

// ElectronJS: CrashReporter
CrashReporter.start = function(opts) {};

// ElectronJS: globalShortcut

globalShortcut.register = function(accelerator, callback) {};
globalShortcut.isRegistered = function(accelerator) {};
globalShortcut.unregister = function(accelerator) {};
globalShortcut.unregisterAll = function() {};

// ElectronJS:  BrowserWindow
BrowserWindow.loadUrl = function(url) {};
BrowserWindow.on = function(eventName, callback) {};
BrowserWindow.openDevTools = function() {};
BrowserWindow.closeDevTools = function() {};
BrowserWindow.toggleDevTools = function() {};
BrowserWindow.reload = function() {};
BrowserWindow.reloadIgnoringCache = function() {};
BrowserWindow.getContentSize = function() {};
BrowserWindow.setTitle = function(title) {};
BrowserWindow.getFocusedWindow = function() {};

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
Socket.close = function() {};

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
_.uniq = function(array, isSorted, iteratee, thisArg) {};
_.map = function(coll, iteratee, thisArg) {};

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
};

var videoFilterSettings = {
  "grayscale": 0,
  "saturate": 0,
  "sepia": 0
};
