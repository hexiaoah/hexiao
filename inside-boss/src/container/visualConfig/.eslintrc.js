// https://eslint.org/docs/user-guide/configuring
const path = require('path')

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
    },
    extends: [
        'airbnb-base',
        'plugin:react/recommended'
    ],
    plugins: [
        'react',
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: path.resolve(__dirname, './eslint_webpack_resolve.js')
            }
        },
        react: {
            version: "detect",
        },
    },
    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'max-len': [1, { 'code': 120 }],
        'indent': ['warn', 4, { 'SwitchCase': 1 }],
        'semi': [1, 'never'],
        'comma-dangle': [1],          // 对象 逗号
        'padded-blocks': [1],         // 闭包 空行
        'no-unused-vars': [1],        // var
        'no-trailing-spaces': [1],    // 末尾空格
        'no-multiple-empty-lines': [1], // 空行
        'no-multi-spaces': 0,      // 行内注释前的额外空格有助于保持代码整齐美观
        'no-underscore-dangle': [0, 'never'],
        'no-restricted-syntax': 0,
        'no-return-await': 0, // 有时需要通过 return 提前退出函数，会有 return await xxx 的情况
        'no-use-before-define': 0, // 自行判断一个函数能否调用成功
        'no-else-return': 0, // 有时多余的 else 是为了明晰代码结构，有必要保留
        'prefer-template': 0, // 有时候使用 string template 反倒影响可读性
        'no-param-reassign': 0,
        'arrow-parens': 0,
        'prefer-destructuring': 0,
        'no-continue': 0,
        'no-await-in-loop': 0,
        'import/no-dynamic-require': 0,
        'import/order': 0,
        'no-loop-func': 0,  // 此规则是针对以前的 var 的，循环中 var 值会变，函数取到的不一定是预期的值；但 const 没有此问题
        'no-undef-init': 0, // 有时就是想明确地把一个变量的初始值设为 undefined
        'no-multi-assign': 0,
        'import/prefer-default-export': 0,
        'prefer-const': 0,
        'react/prop-types': 0,
        'no-return-assign': 0,

        // 无意义的规则
        'lines-between-class-members': 0,
        'class-methods-use-this': 0,
        'object-curly-newline': 0,
        'import/newline-after-import': 0,
        'no-multiple-empty-lines': 0,
    }
  }
