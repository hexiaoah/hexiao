const globals = require('./globals');

module.exports = {
    env: {
        es6: true,
        node: true,
        commonjs: true,
        browser: true,
        jquery: true
    },
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            generators: false,
            objectLiteralDuplicateProperties: false,
            experimentalObjectRestSpread: true,
        },
    },
    plugins: ['import', 'html'], // 插件
    extends: [
        'plugin:import/errors',
        'plugin:import/warnings'
    ], // 扩展规则
    globals,
    rules: {
        // disallow use of undeclared variables unless mentioned in a /*global */ block
        'no-undef': 'error',

        // disallow use of undefined when initializing variables
        'no-undef-init': 'warn',

        // disallow use of undefined variable
        // http://eslint.org/docs/rules/no-undefined
        // TODO: enable?
        'no-undefined': 'off',

        // disallow declaration of variables that are not used in the code
        'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

        // disallow use of variables before they are defined
        // 'no-use-before-define': ['warn', { functions: true, classes: true, variables: true }],
        'no-use-before-define': 'off',

        'no-debugger': 'error'
    },
};
