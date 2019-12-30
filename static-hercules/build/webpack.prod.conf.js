var path = require('path');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require("glob");

var options = process.argv;
for (var i = options.length - 1; i >= 0; i--) {
    if (options[i] && options[i].indexOf('NODE_ENV') > -1) {
        process.env.NODE_ENV = options[i].split('=')[1];
    }
}

var getPlugin = function() {
    var plugin = [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),

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
            plugin.push(new HtmlWebpackPlugin({
                filename: 'page/' + item + '.html',
                template: path.join(config.dev.page, item + '.html'),
                chunks: [item],
                inject: true,
                minify: false,
            }));
        });
    } else {
        var pages = glob.sync("./page/*.html");
        pages.forEach(function(name) {
            var chunk = name.slice(7, name.length - 5);
            var page = name.slice(7, name.length);
            var file = name.slice(2, name.length);
            var temp = path.join(config.dev.page, page);
            plugin.push(
                new HtmlWebpackPlugin({
                    filename: file,
                    template: temp,
                    inject: true,
                    chunks: [chunk],
                    minify: {
                        removeComments: false,
                        collapseWhitespace: false,
                        removeAttributeQuotes: false
                    },
                })
            );
        });
    }
    return plugin;
};

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    plugins: getPlugin()
});

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

module.exports = webpackConfig;