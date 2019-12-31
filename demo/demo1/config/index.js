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
        // Gzip off by default as many popular static hosts such as Surge or Netlify
        // already gzip all static assets for you. Before setting to `true`, make sure
        // to: npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: [
            'js', 'css'
        ],
        // Run the build command with an extra argument to View the bundle analyzer
        // report after build finishes: `npm run build --report` Set to `true` or
        // `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8070,
        page: path.resolve(__dirname, '../page'),
        autoOpenBrowser: true,
        assetsSubDirectory: '',
        assetsPublicPath: '../',
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy" with this
        // option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps) In our experience, they
        // generally work as expected, just be aware of this issue when enabling this
        // option.
        cssSourceMap: false
    },
    // 打包的时候需要替换的内容
    patterns: {
        dev: [
            {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: '../images'
            }
        ],
        daily: [
            {
                match: /(pics)/g,
                replacement: 'http://d.2dfire-daily.com/open/pics'
            }, {
                match: /(\.\.\/css)/g,
                replacement: 'http://d.2dfire-daily.com/open/css'
            }, {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: 'http://d.2dfire-daily.com/open/images'
            }, {
                match: /(\.\.\/js)/g,
                replacement: 'http://d.2dfire-daily.com/open/js'
            }, {
                match: /(\"page\/fonts)/g,
                replacement: '"../page/fonts'
            }, {
                match: /(grunt_env_dev)/g,
                replacement: "grunt_env_release"
            }, {
                match: /(grunt_page_time)/g,
                replacement: PAGE_TIME
            }, {
                match: /(\"\.\.\/\")/g,
                replacement: "''"
            }
        ],
        pre: [
            {
                match: /(\.\.\/js)/g,
                replacement: 'https://d.2dfire-pre.com/open/js'
            }, {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: 'https://d.2dfire-pre.com/open/images'
            },
            // {     match: /(\.\.\/img)/g,     replacement:
            // 'https://d.2dfire-pre.com/open/img' },
            {
                match: /(pics)/g,
                replacement: 'https://d.2dfire-pre.com/open/pics'
            }, {
                match: /(\.\.\/css)/g,
                replacement: 'https://d.2dfire-pre.com/open/css'
            }, {
                match: /(\"page\/fonts)/g,
                replacement: '"../page/fonts'
            }, {
                match: /(grunt_env_dev)/g,
                replacement: "grunt_env_pre"
            }, {
                match: /(grunt_page_time)/g,
                replacement: PAGE_TIME
            }, {
                match: /(\"\.\.\/\")/g,
                replacement: "''"
            }
        ],
        publish: [
            // {     match: /(\.\.\/img)/g,     replacement:
            // 'https://imgcdn.2dfire.com/open/img' },
            {
                match: /(pics)/g,
                replacement: 'https://imgcdn.2dfire.com/open/pics'
            }, {
                match: /(\.\.\/css)/g,
                replacement: '//csscdn.2dfire.com/open/css'
            }, {
                match: /(\.\.\/\.\.\/\.\.\/images)/g,
                replacement: '//d.2dfire.com/open/images'
            }, {
                match: /(\.\.\/js)/g,
                replacement: '//d.2dfire.com/open/js'
            }, {
                match: /(\"page\/fonts)/g,
                replacement: '"../page/fonts'
            }, {
                match: /(grunt_env_dev)/g,
                replacement: "grunt_env_release"
            }, {
                match: /(grunt_page_time)/g,
                replacement: PAGE_TIME
            }, {
                match: /(\"\.\.\/\")/g,
                replacement: "''"
            }
        ]
    }
}
