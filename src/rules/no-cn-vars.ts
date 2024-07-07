import { createEslintRule } from '../utils'

export const RULE_NAME = 'no-cn-vars'
export const MESSAGE_ID = 'noCnVars'
export type MessageIds = 'noCnVars'
export type Options = []

function isIdentifyWithCN(i: string) {
  return /[\u4e00-\u9fa5]+/g.test(i)
}

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  // official
  meta: {
    type: 'problem',
    docs: {
      description: '判断声明是否用了中文',
    },
    fixable: 'code',
    schema: [],
    messages: {
      noCnVars: '不能使用中文声明变量',
    },
  },
  defaultOptions: [],
  // official
  create: (context) => {
    return {
      Identifier(node) {
        const hasCn = isIdentifyWithCN(node.name)
        if (!hasCn)
          return
        context.report({
          node,
          loc: {
            start: node.loc.end,
            end: node.loc.start,
          },
          messageId: MESSAGE_ID,
        })
      },
    }
  },
})