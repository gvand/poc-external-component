const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const resolve = src => path.resolve(__dirname, src);

module.exports = {
  ...config,

  mode: 'development',
  devtool: 'cheap-eval-source-map',

  devServer: {
    inline: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    host: '0.0.0.0',
    overlay: false,
    port: 9000,
    public: process.env.APP_HOST,
    clientLogLevel: 'none',
    disableHostCheck: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
  },

  watchOptions: {
    poll: 2000
  },

  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new HTMLWebpackPlugin({
      inject: 'head',
      filename: 'index.html',
      template: resolve('src/_template.js'),
    })
  ]
};
