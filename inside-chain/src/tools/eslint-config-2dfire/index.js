module.exports = {
    extends: [
        '@2dfire/eslint-config-2dfire-base',
        '@2dfire/eslint-config-2dfire-base/rules/strict',
        './rules/vue',
        './rules/react',
        './rules/react-a11y',
    ].map(require.resolve),
    rules: {}
};
