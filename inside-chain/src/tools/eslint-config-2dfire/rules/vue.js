module.exports = {
    plugins: [
        'vue',
    ],

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.vue', '.json']
            }
        }
    },
    rules: {
        'vue/jsx-uses-vars': 2
    }
};
