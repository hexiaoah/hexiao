var path = require('path')
var config = require('../config')
var utils = require('./utils')
// var px2rem = require('postcss-px2rem')
var px2rem = require('postcss-pxtorem')
var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob')
const webpack = require('webpack')

var options = process.argv
for (var i = options.length - 1; i >= 0; i--) {
  if (options[i] && options[i].indexOf('NODE_ENV') > -1) {
    process.env.NODE_ENV = options[i].split('=')[1]
  }
}

var env = process.env.NODE_ENV || 'dev'

var getEntry = function() {
  var entry = {}
  var pages = glob.sync('./page/*.html')
  pages.forEach(function(name) {
    var key = name.slice(7, name.length - 5)
    var path = './src/' + key + '/main.js'
    entry[key] = path
  })
  return entry
}
/**
 * duhuo@2dfire  2017/07/31
 * 打包配置说明:
 * config中partialPackage可配置是否部分打包
 * 当开启部分打包功能时，需要将currentProject设置成在开发页面的名称
 * 如：当前开发页面meetgame.html，则设置currentProject='meetgame'
 * 当关闭部分打包功能时，不需要做任何设置
 */
var currentProject = ['fm-bank', 'fm-bank-chain']

var entries = {}

if (config.dev.partialPackage) {
  //  entries[currentProject] = "./src/" + currentProject + "/main.js";
  currentProject.forEach(function(item) {
    entries[item] = './src/' + item + '/main.js'
  })
} else {
  entries = getEntry()
}

module.exports = {
  current: currentProject, // 当前开发项目
  // entry: {
  //     // example: './src/example/main.js',
  //     eatlive: './src/eatlive/main.js',
  //     // 刮刮乐游戏
  //     lottery: './src/lottery/main.js',
  //     // 店长奖励查询
  //     managerReword: './src/managerReword/main.js',
  //     // 七夕游戏
  //     meetgame: './src/meetgame/main.js'
  // },
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath:
      env === 'dev'
        ? config.dev.assetsPublicPath
        : config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      vue: 'vue/dist/vue.js',
      src: path.resolve(__dirname, '../src'),
      assets: path.resolve(__dirname, '../src/assets'),
      base: path.resolve(__dirname, '../src/base'),
      components: path.resolve(__dirname, '../src/components'),
      apiConfig: path.resolve(__dirname, '../src/base/config/' + env)
    }
    //  TODO: 合理利用 alias 减少引用文件路径
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(env)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: file => {
          return (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file) &&
            !/@2dfire(.+?)share/.test(file)
          )
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 7000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 6000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  vue: {
    loaders: utils.cssLoaders()
    /*
                 autoprefixer 添加浏览器兼容的css前缀  设置规则参考地址: (官方)https://github.com/postcss/autoprefixer (中文)http://www.ydcss.com/archives/94,
                 px2rem, 参考地址: https://www.npmjs.com/package/postcss-px2rem
                    推荐写法: 所有px会自动被转化为rem, 不需要转换的 请写成大写的 PX
                    原生写法: 使用注释的形式规定是否需要转换,会有点问题,解决办法参见https://github.com/vuejs/vue-loader/issues/227
            */
    /* postcss: [
             px2rem({remUnit: 37.5}),
             require('autoprefixer')({
                 browsers: ['last 2 versions', 'Android > 4', 'iOS > 6', 'Safari > 6']
             })
         ]*/
  },
  postcss: [
    px2rem({
      rootValue: 37.5,
      // unitPrecision: 5, // 转换成rem后的小数点位数
      propList: ['*'], // 需要转换的css属性列表
      minPixelValue: 1.1 // 设置一个最小值，小于这个值就不会被专程rem
    }),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'Android > 4', 'iOS > 6', 'Safari > 6']
    })
  ]
}
