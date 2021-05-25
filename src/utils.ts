import { ReferenceObject, SchemaObject } from './schema'

export function isRefType(input: any): input is ReferenceObject {
  return isObject(input) && Boolean(input.$ref)
}

export function isSchemaType(input: any): input is SchemaObject {
  return isObject(input) && !Boolean(input.$ref)
}

export function isNil(input: any): input is null | undefined {
  return input === null || input === undefined
}

export function isEmpty(input: { length: number }): boolean {
  return isNil(input) || input.length === 0
}

export function isString(input: any): input is string {
  return typeof input === 'string'
}

export function isNumber(input: any): input is number {
  return typeof input === 'number'
}

export function isBoolean(input: any): input is boolean {
  return typeof input === 'boolean'
}

export function isObject(input: any): boolean {
  return input instanceof Object
}

export function keys<K extends string>(input: Record<K, any>): K[] {
  return Object.keys(input) as K[]
}

export function values<V>(input: Record<any, V>): V[] {
  return keys(input).map((key) => input[key])
}

export function entries<K extends string, V>(input: Record<K, V>): [K, V][] {
  return keys(input).map((key) => [key, input[key]])
}

export function dropHead<T>(input: ReadonlyArray<T>): T[] {
  return input.slice(1)
}

export function head<T>(input: T[]): T {
  return input[0]
}

export function flatMap<T, X>(
  array: ReadonlyArray<T>,
  fn: (input: T, index: number, array: ReadonlyArray<T>) => X[],
): X[] {
  const result: X[] = []
  for (let i = 0; i < array.length; i += 1) {
    result.push(...fn(array[i], i, array))
  }
  return result
}
