import { run } from './_test'
import rule, { RULE_NAME, MESSAGE_ID } from './no-dev-log'

const valids = [
  `console.log('123')`,
  `console.log('123',123)`,
]


const invalids = [
  {
    code: 'console.log()',
    output: 'console.log()'
  },
  {
    code: 'console.log(123)',
    output: 'console.log(123)'
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