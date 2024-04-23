module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'prettier/prettier': ['error'],
    'react/function-component-definition': [
      // 함수선언 arrow function, function
      2,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    'react/react-in-jsx-scope': 'off', // 17버전 이후로는 React import 필요 x
  },
};
