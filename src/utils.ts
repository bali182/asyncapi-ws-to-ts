import keys from 'lodash/keys'
import isNil from 'lodash/isNil'
import { SchemaObject, ReferenceObject } from './OpenApiTypings'

export function unique<T>(items: T[]): T[] {
  const set = new Set(items)
  return Array.from(set)
}
export function isObjectType(input: SchemaObject): boolean {
  if (!(input instanceof Object)) {
    return false
  }
  return input.type === 'object' || (isNil(input.type) && Boolean(input.properties))
}
export function isMapType(input: SchemaObject): boolean {
  return input instanceof Object && input.type === 'object' && Boolean(input.additionalProperties)
}
export function isPureMapType(input: SchemaObject): boolean {
  return (
    input instanceof Object &&
    input.type === 'object' &&
    (!Boolean(input.properties) || keys(input.properties).length === 0) &&
    input.additionalProperties !== false
  )
}
export function isEnumType(input: SchemaObject): boolean {
  // We only handle string enums
  return Boolean(input.enum) && (input.type === 'string' || input.enum.every((s) => typeof s === 'string'))
}
export function isArrayType(input: SchemaObject): boolean {
  return input.type === 'array' || Boolean(input.items)
}
export function isSimpleType(input: SchemaObject): boolean {
  return (
    input instanceof Object &&
    (input.type === 'string' ||
      input.type === 'number' ||
      input.type === 'boolean' ||
      input.type === 'integer' ||
      input.type === 'null' ||
      input.type === 'any') &&
    !input.enum
  )
}
export function isOneOfType(input: any): boolean {
  return Boolean(input.oneOf)
}
export function isAnyOfType(input: any): boolean {
  return Boolean(input.anyOf)
}
export function isAllOfType(input: any): boolean {
  return Boolean(input.allOf)
}
export function isRefType(input: any): input is ReferenceObject {
  return input instanceof Object && Boolean(input.$ref)
}
export function isSchemaType(input: any): input is SchemaObject {
  return input instanceof Object && !Boolean(input.$ref)
}
