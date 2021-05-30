import { isNil } from '../../utils'
import { Validator } from '../../validation/typings'
import { ReadContext, ReadInput } from './types'

export function validate<T>(input: ReadInput<T>, context: ReadContext, validator: Validator<T>): boolean {
  const { data, uri } = input
  if (isNil(validator)) {
    return true
  }
  const issues = validator(data, { depth: Infinity, path: uri, pathAccessor: context.uri })
  context.issues.push(...issues)
  return issues.length === 0
}
