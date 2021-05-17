import { Severity, Validator } from '../../validation/typings'
import { FactoryContext } from './FactoryContext'

export const withValidaton = <T>(context: FactoryContext<any>, validator: Validator<any>, fn: () => T): T => {
  const issues = validator(context.data, {
    depth: Infinity,
    path: context.uri,
    pathAccessor: context.pathAccessor,
  })
  context.issues.push(...issues)
  if (issues.some((issue) => issue.severity === Severity.ERROR)) {
    return
  }
  return fn()
}
