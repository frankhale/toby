var path = require("path");

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
  output: {
    filename: "app.js",
    path: __dirname + "/public/scripts"
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    root: [
      path.resolve("./src/react-components")
    ]
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "lodash": "_",
    "socket.io-client": "io",
    "jquery": "$"
  },
};