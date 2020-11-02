module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:vue/essential', 'standard', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['html', 'standard', 'vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
