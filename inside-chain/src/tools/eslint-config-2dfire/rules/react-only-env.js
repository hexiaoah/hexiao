module.exports = {
    plugins: [
        'react',
    ],

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.json']
            }
        },
        react: {
            pragma: 'React',
            version: '15.0'
        },
    },
    rules: {
        'react/jsx-uses-vars': 2,
    }
};
