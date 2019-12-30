// req

// var shelljs = require('shelljs');
require('shelljs/global');

var path = require('path');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');
var config = require("../config");

var spinner = ora('building for production...');
spinner.start();

// var assetsPath   = path.resolve(__dirname, '../assets');

// // clear files
// shelljs.rm('-rf', assetsPath);

var assetsPath = path.join(config.build.assetsRoot);
var release = config.build.release;
// rm('-rf', config.build.assetsRoot);
rm('-rf', release);
mkdir('-p', assetsPath);
cp('-R', 'src/images', assetsPath);

// run webpack
webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) {
        process.stdout.write(err.message + '\n\n');
        process.stdout.write('构建失败\n');
        process.exit(1);
    };
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
});
