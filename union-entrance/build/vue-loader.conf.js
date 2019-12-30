var utils = require('./utils')
var config = require('../config')
var isdev = process.env.NODE_ENV === 'dev'

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: isdev
            ? config.dev.cssSourceMap
            : config.build.productionSourceMap,
        extract: !isdev
    }),
    transformToRequire: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}
