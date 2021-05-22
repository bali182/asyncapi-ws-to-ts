import { Severity, Validator } from '../../validation/typings'
import { FactoryContext, FactoryInput } from './FactoryContext'

export const withValidaton = <T>(
  input: FactoryInput<any>,
  context: FactoryContext,
  validator: Validator<any>,
  fn: () => T,
): T => {
  const issues = validator(input.data, {
    depth: Infinity,
    path: input.uri,
    pathAccessor: context.path,
  })
  context.issues.push(...issues)
  if (issues.some((issue) => issue.severity === Severity.ERROR)) {
    return
  }
  try {
    return fn()
  } catch (error) {
    context.issues.push({
      message: error.message,
      path: input.uri,
      type: null,
      severity: Severity.ERROR,
    })
  }
}
