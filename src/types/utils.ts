import { Severity, Validator } from '../validation/typings'
import { OpenAPIModel, Input } from '../FactoryContext'

export const withValidaton = <T>(
  input: Input<any>,
  context: OpenAPIModel,
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
