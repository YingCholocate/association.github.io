module.exports = {
  extends: ['eslint-config-ali/typescript/react', 'plugin:prettier/recommended'],
  globals: {
    page: true,
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'import/no-cycle': 'off',
    'react/prop-types': 0,
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
    semi: 'error',
  },
};
