module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:nuxt/recommended', 'plugin:prettier/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  ignorePatterns: ['dist/', 'node_modules/'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['checkout'],
      },
    ],
    'vue/no-setup-props-destructure': 'off',
    'vue/no-unused-vars': 'error', // 启用未使用的 class 检查
    'vue/multi-word-component-names': 0,
    'vue/no-v-html': 0,
    'vue/no-v-text-v-html-on-component': 0,
    'vue/attributes-order': 0,
    'vue/no-use-v-if-with-v-for': 0,
  },
}
