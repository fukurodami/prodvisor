import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        useCookie: 'readonly',
        useRuntimeConfig: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        computed: 'readonly',
        ref: 'readonly',
      },
    },
    plugins: { '@typescript-eslint': ts, prettier },
    rules: {
      ...ts.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: ['node_modules/', '.nuxt/', 'dist/', '.output/'],
  },
]
