import { createEslintRule } from '../utils'

export const RULE_NAME = 'no-dev-log'
export const MESSAGE_ID = 'noDevLog'
export type MessageIds = 'noDevLog'
export type Options = []


export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  // official
  meta: {
    type: 'problem',
    docs: {
      description: '判断代码中是否含有开发过程中多余的日志信息，日志信息格式为console.log(number,xxxx)',
    },
    fixable: 'code',
    schema: [],
    messages: {
      noDevLog: '请去除开发日志',
    },
  },
  defaultOptions: [],
  // official
  create: (context) => {
    return {
      CallExpression(node) {
        function isLog() {
          if (node.callee.type === 'MemberExpression') {
            const { object, property } = node.callee
            return object.type === 'Identifier' && object.name === 'console' && property.type === 'Identifier' && property.name === 'log'
          }
          return false
        }
        if (isLog()) {
          if (node.arguments.length === 0 || (node.arguments[0].type === 'Literal' && typeof node.arguments[0].value === 'number')) {
            context.report({
              node,
              loc: {
                start: node.loc.end,
                end: node.loc.start,
              },
              messageId: MESSAGE_ID,
            })
          }
        }

      },
    }
  },
})