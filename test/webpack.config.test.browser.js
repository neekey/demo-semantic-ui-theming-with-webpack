var path = require( 'path' );
var baseConfig = require( '../webpack.config.js');
var testEntryPath = path.resolve( __dirname, './browser-test-entry.js' );
const nodeModules = path.resolve(__dirname, '../node_modules');

module.exports = {
    externals: [
        'react/addons',
        'react/lib/ReactContext',
        'react/lib/ExecutionEnvironment',
    ],
    entry: {
        test: [ 'mocha!' + testEntryPath ]
    },
    output: {
        filename: '[name].js',
    },
    devServer: {
        host: 'localhost',
        port: '8081'
    },

    resolve: {
        alias: {
            'sinon': path.resolve(nodeModules, 'sinon/pkg/sinon.js'),
            'chai': path.resolve(nodeModules, 'chai/chai.js')
        }
    },

    module: {
        noParse: [
            ///enzyme/,
            /sinon/,
            /chai/
        ],
        loaders: baseConfig.module.loaders,
    },
    sassLoader: baseConfig.sassLoader,
    imageWebpackLoader: baseConfig.imageWebpackLoader,
};
