// server.ts - Express setup and initiation
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

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as path from "path";
import * as http from "http";
import * as debug from "debug";

import API from "./api"
import DB from "./db";

export default class Server {
  private app : express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  static bootstrap() {
    return new Server();
  }

  config(): void {
    let server: http.Server,
        db : DB,
        api : API,
        serverPort = "62374";

    debug("toby:server");

    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.set("view engine", "hbs");
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.use(favicon(path.join(__dirname, "../public", "images", "toby.ico")));
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.set("port", serverPort);

    server = http.createServer(this.app);
    server.listen(serverPort);
    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      const bind = typeof serverPort === "string" ? `Pipe ${serverPort}` : `Port ${serverPort}`;

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
    });
    server.on("listening", () => {
      const addr = server.address();
      const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
      debug("Listening on " + bind);
    });

    db = new DB();

    api = new API(db, server);

    this.app.get("/", (req, res, next) => {
      res.render("index");
    });

    //this.app.use("/", router);
    this.app.use("/api", api.router);

    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      let err = new Error("Not Found");
      err["status"] = 404;
      next(err);
    });

    // development error handler
    // will print stacktrace
    if (this.app.get("env") === "development") {
      this.app.use((err, req, res, next) => {
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
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: {}
      });
    });
  }
}

Server.bootstrap();