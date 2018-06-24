const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/modernui.tsx",
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
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    modules: [path.resolve("./src"), "node_modules"]
  },
  output: {
    filename: "modernui.bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
