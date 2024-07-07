import { run } from './_test'
import rule, { RULE_NAME, MESSAGE_ID } from './no-cn-vars'

const valids = [
  `const a = 1`,
  `function a(){}`,
]


const invalids = [
  {
    code: 'const 中文 = 2',
    output: 'const 中文 = 2'
  },
  {
    code: 'function 中文(){}',
    output: 'function 中文(){}'
  }
]

run({
  name: RULE_NAME,
  rule,
  valid: valids,
  invalid: invalids.map(i => {
    return {
      ...i,
      errors: [{ messageId: MESSAGE_ID }],
    }
  }),
})