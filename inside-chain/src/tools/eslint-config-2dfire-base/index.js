const baseGlobals = require('./globals');

const globals = Object.keys(baseGlobals).reduce((p, key) => {
    p[key] = false;
    return p;
}, {});

module.exports = {
    extends: ['eslint:recommended']
    .concat([
        // './rules/best-practices',
        './rules/errors',
        './rules/node',
        './rules/style',
        './rules/variables',
        './rules/es6',
        './rules/imports',
        './easy',
    ].map(require.resolve)),
    globals,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    rules: {
        strict: 'error',
    },
};
