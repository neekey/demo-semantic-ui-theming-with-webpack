const path = require('path');
const ENV = process.env.NODE_ENV;
const webpack = require('webpack') || 'development';

const bourbon = require('bourbon');
const bourbonNeat = require('bourbon-neat');

const BUILD_DIR = path.resolve(__dirname, '../build');
const PLUGINS = [];
const PAGE_ENTRIES = {
    app: path.resolve(__dirname, '../app/app.js'),
    vendor: [
        'babel-polyfill',
        'react',
        'react-dom',
        'react-router',
    ],
};

if (ENV === 'development') {
    PAGE_ENTRIES['webpack-dev-server'] = 'webpack/hot/dev-server';
}

PLUGINS.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));
PLUGINS.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(ENV)
}));

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
        alias: {},
    },
    module: {
        noParse: [],
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
                test: /\.json$/,
                loader: 'json',
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
