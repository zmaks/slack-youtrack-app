module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        '@jetbrains',
        '@jetbrains/eslint-config/react',
        '@jetbrains/eslint-config/browser',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'backend'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        'max-len': ["error", {"code": 120}],
        "indent": ["error", 4],
        "@typescript-eslint/no-explicit-any": "warn",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
    },
}
