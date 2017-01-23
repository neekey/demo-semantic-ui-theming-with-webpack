const path = require('path');
const webpack = require('webpack');
const RewriteImportPlugin = require("less-plugin-rewrite-import");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(__dirname, 'app');
const BUILD_DIR = path.resolve(__dirname, 'build');

var webpackConfig = {
  devtool: 'eval',
  entry: {
    index: path.resolve(SRC_DIR, 'index.js'),
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash:8].js',
  },
  resolve: {
    root: ROOT_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.less/,
        loader: 'style!css!less',
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)$/,
        loader: 'url-loader?limit=1024&name=[name]-[hash:8].[ext]!image-webpack',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {presets: ['es2015']}
        // 'babel-loader' is also a legal name to reference
      },
    ],
  },
  lessLoader: {
    lessPlugins: [
      new RewriteImportPlugin({
        paths: {
          '../../theme.config':  __dirname + '/app/semantic-ui/theme.config',
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app/index.html',
      filename: 'index.html',
      chunks: ['index'],
      chunksSortMode: 'dependency',
      env: process.env,
    }),
  ],
};

module.exports = webpackConfig;
