module.exports = {
    root: true,
    plugins: ['prettier', '@typescript-eslint'],
    env: {
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    rules: {
        'prettier/prettier': 'error',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'import/no-cycle': [2, { ignoreExternal: true, maxDepth: Infinity }],
        'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
        'import/no-named-as-default-member': 'off',
        'import/no-default-export': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/ban-ts-comment': [
            2,
            {
                'ts-ignore': 'allow-with-description',
                'ts-nocheck': true,
                'ts-check': false,
                minimumDescriptionLength: 3,
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
    },
};
