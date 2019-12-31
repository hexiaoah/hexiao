// http://eslint.org/docs/user-guide/configuring

module.exports = {
    // 表示根规则
    "root": true,
    "extends": [
        // 使用规则
        "@2dfire/eslint-config-2dfire/easy",
        "@2dfire/eslint-config-2dfire/rules/vue-only-env",
    ],
    "settings": {
        "import/resolver": {
            "webpack": {
                // import规则来自webpack
                "config": "./build/webpack.base.conf.js"
            }
        }
    },
}
