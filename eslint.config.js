import myPlugin from './dist/index.mjs'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ...myPlugin.configs.recommended,
    files: ['**/*.ts', '**/*.js', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
]
