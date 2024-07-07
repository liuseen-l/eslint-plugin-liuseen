import type { ESLint, Linter } from 'eslint'
import { version, } from '../package.json'
import noCnVars from './rules/no-cn-vars'
import tsParser from '@typescript-eslint/parser'

const plugin = {
  meta: {
    name: 'eslint-plugin-liuseen',
    version,
  },
  rules: {
    'no-cn-vars': noCnVars,
  },
  configs: {}
} satisfies ESLint.Plugin


Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      'eslint-plugin-liuseen': plugin
    },
    rules: {
      "eslint-plugin-liuseen/no-cn-vars": "error"
    },
   
  }
} as ESLint.Plugin['configs'])

export default plugin

type RuleDefinitions = typeof plugin['rules']

export type RuleOptions = {
  [K in keyof RuleDefinitions]: RuleDefinitions[K]['defaultOptions']
}

export type Rules = {
  [K in keyof RuleOptions]: Linter.RuleEntry<RuleOptions[K]>
}