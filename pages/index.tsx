import React from "react";
import Head from "next/head";
//import dynamic from "next/dynamic";

// import AppBar from "@material-ui/core/AppBar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import Toolbar from "@material-ui/core/Toolbar";
// import Input from "@material-ui/core/Input";

// import unusedYouTube from "../components/youtube";
// type YouTubeType = typeof unusedYouTube;
//const YouTube = dynamic((import("../components/youtube") as any) as Promise<YouTubeType>);

//const YouTube = dynamic(import("../components/youtube").then(module => module.default));

import YouTube from "../components/youtube";

const pkgJSON = require("../package.json");

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <YouTube id="player1" ytid="WfVsT88Pwz0" />
        <Head>
          <title>{pkgJSON.title}</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="./static/stylesheets/main.css" />
        </Head>
      </div>
    );
  }
}
