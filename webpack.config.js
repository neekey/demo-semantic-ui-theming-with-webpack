const path = require('path');
const ENV = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ROOT_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(__dirname, 'app');

const BUILD_DIR = path.resolve(__dirname, 'build');
const PLUGINS = [];
const PAGE_ENTRIES = {
  index: path.resolve(SRC_DIR, 'index.js'),
};

if (ENV === 'development') {
  PAGE_ENTRIES['webpack-dev-server'] = 'webpack/hot/dev-server';
}

PLUGINS.push(new HtmlWebpackPlugin({
  inject: 'body',
  template: '!!ejs!app/index.ejs',
  filename: 'index.html',
  chunks: ['index'],
  chunksSortMode: 'dependency',
  env: process.env,
}));

var webpackConfig = {
  devtool: 'eval',
  entry: PAGE_ENTRIES,
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash:8].js',
  },
  resolve: {
    root: ROOT_DIR,
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: SRC_DIR,
      },
    ],
    loaders: [
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css?localIdentName=[path][name]---[local]---[hash:base64:5]', // Run both loaders
      },
      {
        test: /\.scss$/,
        loader: 'style!css?module&camelCase&localIdentName=[local]-[hash:5]!sass',
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name]-[hash:8].[ext]',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {presets: ['react', 'es2015']}
        // 'babel-loader' is also a legal name to reference
      },
    ],
  },
  plugins: PLUGINS,
  imageWebpackLoader: {
    pngquant: {
      quality: '65-90',
      speed: 4,
    },
  },
};

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]);
}

module.exports = webpackConfig;
