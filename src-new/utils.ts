export function isNil(input: any): input is null | undefined {
  return input === null || input === undefined
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

export function keys(input: object): string[] {
  return Object.keys(input)
}

export function values(input: object): any[] {
  return keys(input).map((key) => input[key])
}

export function dropHead<T>(input: ReadonlyArray<T>): T[] {
  return input.slice(1)
}