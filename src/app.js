// app.js - Express setup and initiation
// Copyright (C) 2016 Frank Hale <frankhale@gmail.com>
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

const killable = require('killable');
const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const debug = require("debug")("toby-xxx:server");
const http = require("http");
const process = require("process");
const port = normalizePort(process.env.PORT || "3000");
const server = http.createServer(app);
const spawn = require('child_process').spawn

const api = require("./api");
const index = require("./index")

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
server.on("close", function() {
  console.log("Shutting down database connection...");
  api.close();
});

killable(server);

app.set("port", port);

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "../public", "images", "toby.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

api.router.post("/app/close", (req, res, next) => {
  console.log("server has been requested to shutdown...");
  server.kill(function () {
    console.log("server has shutdown!");
    process.exit(0);
  });
});

app.use("/", index);
app.use("/api", api.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    console.log(err.stack);

    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  debug("Listening on " + bind);

  // const nwDir = `${process.cwd()}/nwjs`;
  // spawn(`${nwDir}/nw.exe`, [ `${nwDir}/toby` ]);
}

module.exports = app;
