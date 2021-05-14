import { Diagnostics, DiagnosticSeverity } from '../Diagnostics'
import { isBoolean, isNumber, isObject, isString } from '../utils'

export const asserter = <T>(
  assert: (value: T) => boolean,
  message: (value: T) => string,
  severity: DiagnosticSeverity = DiagnosticSeverity.ERROR,
) => (diagnostics: Diagnostics, value: T, ...path: string[]): boolean => {
  if (!assert(value)) {
    diagnostics.child(...path).append({ severity, message: message(value), path: diagnostics.path() })
    return false
  }
  return true
}

const oneOf = (...fns: ((input: any) => boolean)[]) => (input: any) => fns.some((fn) => fn(input))
const includes = (values: any[]) => (input: any) => values.indexOf(input) >= 0
const hasLength = (l: number) => (input: any[] | string) => input.length === l

export const d = {
  array: asserter<any>(Array.isArray, (input: any) => `Should be an array, got ${JSON.stringify(input)} instead`),
  object: asserter<any>(isObject, (input: any) => `Should be an object, got ${JSON.stringify(input)} instead`),
  number: asserter<any>(isNumber, (input: any) => `Should be a number, got ${JSON.stringify(input)} instead`),
  boolean: asserter<any>(isBoolean, (input: any) => `Should be a boolean, got ${JSON.stringify(input)} instead`),
  string: asserter<any>(isString, (input: any) => `Should be a string, got ${JSON.stringify(input)} instead`),
  length: (l: number) =>
    asserter<any[]>(hasLength(l), (input: any[]) => `Should have length ${l}, got length ${input.length} instead`),
  includes: (values: any[]) =>
    asserter<any>(includes(values), (input: any) => `Should be one of ${values}, got ${JSON.stringify(input)} instead`),
  primitive: asserter<any>(
    oneOf(isString, isNumber, isBoolean),
    (input: any) => `Should be a primitive (string, boolean or number), got ${JSON.stringify(input)} instead`,
  ),
}
