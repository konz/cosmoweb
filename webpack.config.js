const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'static',
      ignore: '.DS_Store'
    }]),
    new webpack.DefinePlugin({
      REGION: JSON.stringify(process.env.AWS_REGION),
      IDENTITY_POOL_ID: JSON.stringify(process.env.IDENTITY_POOL_ID),
      IOT_ENDPOINT: JSON.stringify(process.env.IOT_ENDPOINT)
    }),
    new MinifyPlugin()
  ],
  node: {
    fs: 'empty',
    tls: 'empty'
  }
};
