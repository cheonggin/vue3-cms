module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'array-callback-return': 'off'
  }
}
