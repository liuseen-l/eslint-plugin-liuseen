import type { ESLint, Linter } from 'eslint'
import { version, } from '../package.json'
import noCnVars from './rules/no-cn-vars'

const _plugin = {
  meta: {
    name: 'liuseen',
    version,
  },
  rules: {
    'no-cn-vars': noCnVars,
  },
  configs: {}
} satisfies ESLint.Plugin


const plugin = Object.assign(_plugin.configs, {
  recommended: [{
    plugins: {
      'eslint-plugin-liuseen': _plugin
    },
    rules: {
      "eslint-plugin-liuseen/no-cn-vars": "error"
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }]
} as ESLint.Plugin['configs'])

export default plugin

type RuleDefinitions = typeof plugin['rules']

export type RuleOptions = {
  [K in keyof RuleDefinitions]: RuleDefinitions[K]['defaultOptions']
}

export type Rules = {
  [K in keyof RuleOptions]: Linter.RuleEntry<RuleOptions[K]>
}