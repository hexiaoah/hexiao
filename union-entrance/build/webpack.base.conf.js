var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var glob = require('glob')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var env = process.env.NODE_ENV || 'dev'

var getEntry = function() {
  var entry = {}
  var pages = glob.sync('./page/*.html')
  pages.forEach(function(name) {
    var key = name.slice(7, name.length - 5)
    var path = './src/views/' + key + '/main.js'
    entry[key] = path
  })
  return entry
}

var entries = getEntry()

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'dev'
        ? config.dev.assetsPublicPath
        : config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      apiConfig: resolve('src/base/config/' + env)
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(env)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        options: {
          autoprefixer: {
            browsers: [
              'last 2 versions',
              'Android > 4',
              'iOS > 6',
              'Safari > 6'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/iview')
        ]
        // options: {
        //   presets: ['es2015'],
        //   plugins: ['transform-runtime']
        // }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('pics/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
