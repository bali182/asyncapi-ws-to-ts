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

export function groupBy<V, K>(input: V[], grouper: (input: V) => K): Map<K, V[]> {
  return input.reduce((map, item) => {
    const key = grouper(item)
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key).push(item)
    return map
  }, new Map())
}

export function uniqueBy<V, K>(input: V[], by: (input: V) => K): V[] {
  return Array.from(
    input
      .reduce((map, item) => {
        const key = by(item)
        return map.has(key) ? map : map.set(key, item)
      }, new Map<K, V>())
      .values(),
  )
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

const Keywords = new Set([
  'eval',
  'arguments',
  'break',
  'case',
  'catch',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'finally',
  'for',
  'function',
  'if',
  'in',
  'instanceof',
  'new',
  'return',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'class',
  'const',
  'export',
  'extends',
  'import',
  'super',
  'implements',
  'interface',
  'let',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield',
  'null',
  'true',
  'false',
  'NaN',
  'Infinity',
  'undefined',
])

export function isValidIdentifier(name: string): boolean {
  return !Keywords.has(name) && /^[a-z_]\\w*$/.test(name)
}

export function hasOwnProperty(object: object, property: string): boolean {
  return Object.prototype.hasOwnProperty.call(object, property)
}
