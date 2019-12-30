// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

const now = new Date();
const PAGE_TIME = now.getTime();

module.exports = {
    build: {
        env: require('./prod.env'),
        release: path.resolve(__dirname, '../release'),
        assetsRoot: path.resolve(__dirname, '../release/tmp'),
        assetsSrcRoot: path.resolve(__dirname, '../src'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '../',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 3003,
        page: path.resolve(__dirname, '../page'),
        autoOpenBrowser: true,
        assetsSubDirectory: '',
        assetsPublicPath: '../',
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },
    // 打包的时候需要替换的内容
    patterns: {
        dev: [
            {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: '../images'
            },
        ],
        daily: [
            {
                match: /(grunt_env_dev)/g,
                replacement: "grunt_env_daily"
            },
            {
                match: /(grunt_page_time)/g,
                replacement: PAGE_TIME
            },
            {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: '../images'
            },
        ],
        pre: [
            {
                match: /(\.\.\/js)/g,
                replacement: 'https://biz.2dfire-pre.com/chain/js'
            },
            {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: 'https://biz.2dfire-pre.com/chain/images'
            },
            {
                match: /(\.\.\/img)/g,
                replacement: 'https://biz.2dfire-pre.com/chain/img'
            },
            {
                match: /(\.\.\/css)/g,
                replacement: 'https://biz.2dfire-pre.com/chain/css'
            },
            {
                match: /(\.\.\/fonts)/g,
                replacement: 'https://biz.2dfire-pre.com/chain/fonts'
            },
            {
                match: /(\"fonts)/g,
                replacement: '"../fonts'
            },
            {
                match: /(grunt_env_dev)/g,
                replacement: "grunt_env_pre"
            },
            {
                match: /(grunt_page_time)/g,
                replacement: PAGE_TIME
            },
            {
                match: /(\"\.\.\/\")/g,
                replacement: "''"
            }
        ],
        publish: [
            {
                match: /(\.\.\/img)/g,
                replacement: 'https://imgcdn.2dfire.com/chain/img'
            },
            {
                match: /(\.\.\/css)/g,
                replacement: '//csscdn.2dfire.com/chain/css'
            },
            {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: '//biz.2dfire.com/chain/images'
            },
            {
                match: /(\.\.\/js)/g,
                replacement: '//biz.2dfire.com/chain/js'
            },
            {
                match: /(\.\.\/fonts)/g,
                replacement: '//biz.2dfire.com/chain/fonts'
            },
            {
                match: /(\"fonts)/g,
                replacement: '"../fonts'
            },
            {
                match: /(grunt_env_dev)/g,
                replacement: "grunt_env_release"
            },
            {
                match: /(grunt_page_time)/g,
                replacement: PAGE_TIME
            },
            {
                match: /(\"\.\.\/\")/g,
                replacement: "''"
            }
        ]
    }
}
