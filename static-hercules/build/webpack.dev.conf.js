var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require("glob");

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

var getPlugin = function() {
    var plugin = [
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title: '跳转页',
            chunks: [],
            inject: true
        }),
    ];
    if (config.dev.partialPackage) {
        var current = baseWebpackConfig.current;
        current.forEach(function(item) {
            console.log("打包item:" + item);
            plugin.push(new HtmlWebpackPlugin({
                filename: 'page/' + item + '.html',
                template: path.join(config.dev.page, item + '.html'),
                chunks: [item],
                inject: true
            }));
        });
    } else {
        var pages = glob.sync("./page/*.html");
        pages.forEach(function(name) {
            var chunk = name.slice(7, name.length - 5);
            var page = name.slice(7, name.length);
            var file = name.slice(2, name.length);
            var temp = path.join(config.dev.page, page);
            // console.log("chunk:" + chunk)
            // console.log("page:" + page)
            // console.log("file:" + file)
            // console.log("temp:" + temp)
            plugin.push(
                new HtmlWebpackPlugin({
                    filename: file,
                    template: temp,
                    inject: true,
                    chunks: [chunk]
                })
            );
        });
    }
    return plugin;
};

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: getPlugin()
        // [
        //     // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        //     new webpack.optimize.OccurenceOrderPlugin(),
        //     new webpack.HotModuleReplacementPlugin(),
        //     new webpack.NoErrorsPlugin(),
        //     // https://github.com/ampedandwired/html-webpack-plugin
        //     new HtmlWebpackPlugin({
        //         filename: 'page/example.html',
        //         template: path.join(config.dev.page, 'example.html'),
        //         chunks: ['example'],
        //         inject: true
        //     }),
        //     new HtmlWebpackPlugin({
        //         filename: 'page/eatlive.html',
        //         template: path.join(config.dev.page, 'eatlive.html'),
        //         chunks: ['eatlive'],
        //         inject: true
        //     }),
        //     new HtmlWebpackPlugin({
        //         filename: 'page/lottery.html',
        //         template: path.join(config.dev.page, 'lottery.html'),
        //         chunks: ['lottery'],
        //         inject: true
        //     }),
        //     new HtmlWebpackPlugin({
        //         filename: 'page/managerReword.html',
        //         template: path.join(config.dev.page, 'managerReword.html'),
        //         chunks: ['managerReword'],
        //         inject: true
        //     }),
        //     new HtmlWebpackPlugin({
        //         filename: 'page/meetgame.html',
        //         template: path.join(config.dev.page, 'meetgame.html'),
        //         chunks: ['meetgame'],
        //         inject: true
        //     }),
        //     new HtmlWebpackPlugin({
        //         filename: 'index.html',
        //         template: 'index.html',
        //         title: '跳转页',
        //         chunks: [],
        //         inject: true
        //     })
        // ]
});