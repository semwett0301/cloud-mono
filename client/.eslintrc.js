module.exports = {
  extends: ['../eslint-config', 'plugin:prettier/recommended'],
  settings: {
    'import/ignore': ['./node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [__dirname + '/tsconfig.json'],
      },
    },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'react/display-name': 0,
    'react/jsx-props-no-spreading': 0,
    'newline-before-return': 2,
    'arrow-body-style': [2, 'as-needed'],
    'no-param-reassign': ['error', {
          props: true,
          ignorePropertyModificationsFor: [
            'state',
          ]
        }],
  },
};
