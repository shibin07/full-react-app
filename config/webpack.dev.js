const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:5083/",
  },
  devServer: {
    port: 5083,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "full_react_app",
      filename: "remoteEntry.js",
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
