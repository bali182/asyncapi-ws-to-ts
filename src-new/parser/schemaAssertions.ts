import keys from 'lodash/keys'
import isNil from 'lodash/isNil'
import { ReferenceObject, SchemaObject } from '../schema'
import { isObject } from '../utils'

export function isObjectType(input: SchemaObject): boolean {
  if (!isObject(input)) {
    return false
  }
  return input.type === 'object' || (isNil(input.type) && Boolean(input.properties))
}

export function isDictionaryType(input: SchemaObject): boolean {
  return isObject(input) && input.type === 'object' && Boolean(input.additionalProperties)
}

export function isPureDictionaryType(input: SchemaObject): boolean {
  return (
    isObject(input) &&
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

export function isNumberType(input: SchemaObject): boolean {
  return isObject(input) && ['number', 'integer', 'int', 'float'].indexOf(input.type) >= 0 && !input.enum
}

export function isBooleanType(input: SchemaObject): boolean {
  return isObject(input) && input.type === 'boolean' && !input.enum
}

export function isStringType(input: SchemaObject): boolean {
  return isObject(input) && input.type === 'string' && !input.enum
}

export function isOneOfType(input: any): boolean {
  return Array.isArray(input.oneOf)
}

export function isAnyOfType(input: any): boolean {
  return Array.isArray(input.anyOf)
}

export function isAllOfType(input: any): boolean {
  return Array.isArray(input.allOf)
}

export function isRefType(input: any): input is ReferenceObject {
  return isObject(input) && Boolean(input.$ref)
}

export function isSchemaType(input: any): input is SchemaObject {
  return isObject(input) && !Boolean(input.$ref)
}
