module.exports = {
  extends: ['eslint-config-ali/typescript/react', 'plugin:prettier/recommended'],
  globals: {
    page: true,
  },
  plugins: ['prettier'],
  rules: {
    'import/no-cycle': 'off',
    'react/prop-types': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': 'error',
  },
};
