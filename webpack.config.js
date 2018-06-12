const path = require("path");

module.exports = {
  entry: [
    "command-input-ui.tsx",
    "dropdown-ui.tsx",
    "infrastructure.ts",
    "toby-ui.tsx",
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
  output: {
    filename: "app.js",
    path: __dirname + "/public/scripts"
  }
};
