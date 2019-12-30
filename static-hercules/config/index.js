// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
let localConfig
try {
  localConfig = require('../local.config')
} catch (e) {
  localConfig = {}
}

module.exports = {
  build: {
    page: path.resolve(__dirname, '../page'),
    assetsRoot: path.resolve(__dirname, '../release/tmp'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    port: 6060,
    page: path.resolve(__dirname, '../page'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    proxyTable: Object.assign({}, localConfig.proxyTable || {}),
    partialPackage: true, // 是否部分打包（打包进行的项目）
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    // proxyTable: {
    //   '/api': {
    //     target: 'http://api.l.whereask.com/service/api',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    // },
  }
}