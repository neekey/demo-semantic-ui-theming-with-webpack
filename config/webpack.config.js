const path = require('path');
const ENV = process.env.NODE_DEV;
const webpack = require('webpack');
//require('./route-builder');
// const nodeModules = path.resolve(__dirname, '../node_modules');

const bourbon = require('bourbon');
const bourbonNeat = require('bourbon-neat');
// const pathToAngular = path.resolve(nodeModules, 'angular/angular.min.js');
// const pathToUIRouterExtra = path.resolve(nodeModules, 'ui-router-extras/release/modular/');

const BUILD_DIR = path.resolve(__dirname, '../build');
const PLUGINS = [];
const PAGE_ENTRIES = {
    app: path.resolve(__dirname, '../app/app.js'),
    vendor: [
        'babel-polyfill',
        //'angular',
        //'angular-resource',
        //'angular-ui-router',
    ],
};

if (ENV === 'development') {
    PAGE_ENTRIES['webpack-dev-server'] = 'webpack/hot/dev-server';
    //PAGE_ENTRIES['test-launcher'] = path.resolve(__dirname, '../app/test-launcher.js');
}

PLUGINS.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));

if (ENV === 'production') {
    PLUGINS.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }));
}

module.exports = {
    entry: PAGE_ENTRIES,
    output: {
        path: BUILD_DIR,
        filename: '[name].js',
    },
    resolve: {
        alias: {
            // 'angular': pathToAngular
            // 'ui-router-extras': pathToUIRouterExtra
        },
    },
    module: {
        preLoaders: [
            // Javascript
             { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules|build/ },
        ],
        loaders: [
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]', // Run both loaders
            },
            {
                test: /\.scss$/,
                loader: 'style!css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!sass',
            },
            {
                test: /\.html$/,
                loader: 'html',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=1024&name=[name]-[hash:8].[ext]!image-webpack',
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: { presets: ['react', 'es2015'] }
                // 'babel-loader' is also a legal name to reference
            },
        ],
    },
    plugins: PLUGINS,
    sassLoader: {
        includePaths: [bourbon.includePaths, bourbonNeat.includePaths],
    },

    eslint: {
        extends: 'airbnb',
        rules: {
            indent: ['error', 4],
            'no-param-reassign': 0,
            'arrow-body-style': ['error', 'always'],
            "react/jsx-indent": [2, 4],
            "react/prefer-es6-class": [2,"never"]
        },
    },

    imageWebpackLoader: {
        pngquant: {
            quality: '65-90',
            speed: 4,
        },
    },
};
