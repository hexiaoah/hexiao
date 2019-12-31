var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var path = require('path');
var glob = require("glob");

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var getPlugin = function () {
    var plugin = [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title: '跳转页',
            chunks: [],
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ];
    var pages = glob.sync("./page/*.html");
    pages.forEach(function (name) {
        var chunk = name.slice(7, name.length - 5);
        var page = name.slice(7, name.length);
        var file = name.slice(2, name.length);
        var temp = path.join(config.dev.page, page);
        plugin.push(
            new HtmlWebpackPlugin({
                filename: file,
                template: temp,
                inject: true,
                chunks: [chunk]
            })
        );
    });
    return plugin;
};

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    plugins: getPlugin()
})
