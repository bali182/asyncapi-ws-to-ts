import { Severity, Validator } from '../../validation/typings'
import { OpenAPIReadContext, Input } from '../readTypes'

export const withValidaton = <T>(
  input: Input<any>,
  context: OpenAPIReadContext,
  validator: Validator<any>,
  fn: () => T,
): T => {
  const { config } = context

  const issues = validator(input.data, {
    depth: Infinity,
    path: input.uri,
    pathAccessor: config.uri,
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
