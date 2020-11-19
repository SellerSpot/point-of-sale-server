module.exports = {
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'no-console': 0,
        'prettier/prettier': 2,
    },
    plugins: ['@typescript-eslint'],
};
