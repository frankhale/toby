const path = require("path");
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "development",
  entry: [
    "command-input-ui.tsx",
    "dropdown-ui.tsx",
    "infrastructure.ts",
    "toby-ui.tsx",
    "server-log-ui.tsx",
    "version-ui.tsx",
    "video-list-grid-ui.tsx",
    "video-list-ui.tsx",
    "youtube-ui.tsx"
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve("./src/react-components"), "node_modules"]
  },
  //plugins: [new UglifyJsPlugin()],
  output: {
    filename: "app.js",
    path: __dirname + "/public/scripts"
  }
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // }
};
