// server.ts - The custom Next.js server used by Toby
// Copyright 2018 Frank Hale <frankhale@gmail.com>
// Author(s): Frank Hale <frankhale@gmail.com>
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

import * as next from "next";
import * as express from "express";
import * as bodyParser from "body-parser";
import API from "./api";
import DB from "./db";

const port = parseInt(process.env.PORT, 10) || 3000,
  dev = process.env.NODE_ENV !== "production",
  app = next({ dev }),
  handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  new API(new DB(), server);

  server.get("*", (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
