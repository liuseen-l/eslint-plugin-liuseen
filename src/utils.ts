import type { RuleListener, RuleWithMeta, RuleWithMetaAndName } from '@typescript-eslint/utils/eslint-utils'
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import type { Rule } from 'eslint'

const hasDocs = [
  'consistent-list-newline',
  'if-newline',
  'import-dedupe',
  'top-level-function',
]

const blobUrl = 'https://github.com/liuseen-L/eslint-plugin-liuseen-l/blob/main/src/rules/'

function genRuleDocUrl(ruleName: string) {
  return hasDocs.includes(ruleName) ? `${blobUrl}${ruleName}.md` : `${blobUrl}${ruleName}.test.ts`
}

export interface RuleModule<
  T extends readonly unknown[],
> extends Rule.RuleModule {
  defaultOptions: T
}

function createRule<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
>({
  create,
  defaultOptions,
  meta,
}: Readonly<RuleWithMeta<TOptions, TMessageIds>>): RuleModule<TOptions> {
  return {
    create: ((
      context: Readonly<RuleContext<TMessageIds, TOptions>>,
    ): RuleListener => {
      const optionsWithDefault = context.options.map((options, index) => {
        return {
          ...defaultOptions[index] || {},
          ...options || {},
        }
      }) as unknown as TOptions
      return create(context, optionsWithDefault)
    }) as any,
    defaultOptions,
    meta: meta as any,
  }
}



export function createEslintRule<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
>({
  name,
  meta,
  ...rule
}: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>): RuleModule<TOptions> {
  return createRule<TOptions, TMessageIds>({
    meta: {
      ...meta,
      docs: {
        ...meta.docs,
        url: genRuleDocUrl(name),
      },
    },
    ...rule,
  })
}


const warned = new Set<string>()

export function warnOnce(message: string) {
  if (warned.has(message))
    return
  warned.add(message)
  // console.warn(message)
}