import { run } from './_test'
import rule, { RULE_NAME ,MESSAGE_ID} from './no-cn-vars'

const valids = [
  `const a = 1`,
  `function a(){}`,
]


const invalids = [
  ['const 中文 = 2', 'function 中文(){}'],
]

run({
  name: RULE_NAME,
  rule,
  valid: valids,
  invalid: invalids.map(i => ({
    code: i[0],
    output: i[1],
    errors: [{ messageId: MESSAGE_ID }],
  })),
})