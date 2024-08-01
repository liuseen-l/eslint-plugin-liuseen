import type { ESLint, Linter } from 'eslint'
import { version, } from '../package.json'
import noCnVars from './rules/no-cn-vars'
import noDevLog from './rules/no-dev-log'
const plugin = {
  meta: {
    name: 'eslint-plugin-liuseen',
    version,
  },
  rules: {
    'no-cn-vars': noCnVars,
    'no-dev-log': noDevLog
  },
  configs: {},
  processors: {}
} satisfies ESLint.Plugin


Object.assign(plugin.configs, {
  recommended: {
    plugins: {
      'eslint-plugin-liuseen': plugin
    },
    rules: {
      "eslint-plugin-liuseen/no-cn-vars": "error",
      "eslint-plugin-liuseen/no-dev-log": "error"
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