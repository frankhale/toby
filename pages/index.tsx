import React from "react";
import Head from "next/head";

const pkgJSON = require("../package.json");

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <div id="frontEnd" />
        <script src="./static/scripts/modernui.bundle.js" />
        <Head>
          <title>{pkgJSON.title}</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
      </div>
    );
  }
}
