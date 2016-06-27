var baseConfig = require( '../config/webpack.config.js');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],
    module: {
        loaders: baseConfig.module.loaders,
    },
    sassLoader: baseConfig.sassLoader,
    imageWebpackLoader: baseConfig.imageWebpackLoader,
};
