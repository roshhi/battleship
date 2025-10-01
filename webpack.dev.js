const path = require("path");
const common = require("./webpack.common");
const{merge} = require("webpack-merge")


module.exports = merge( common, {

  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    port: 3000,
    open: true,         // Automatically opens web browser when the dev server starts.
    hot: true,          // When editing your JS/CSS, only the changed parts update in the browser without a full reload.
    compress: true,     // Makes app load faster during dev
    watchFiles: ["./src/**/*"] //Tells the dev server to watch for changes in the src/ directory.
  },
} );