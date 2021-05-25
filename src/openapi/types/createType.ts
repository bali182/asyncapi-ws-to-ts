import { schemaValidator } from '../sanitization/schemaObject'
import { ReferenceObject, SchemaObject } from '../../schema'
import { Ref, Type } from './types'
import { isNil, isRefType } from '../../utils'
import { OpenAPIReadContext, Input } from '../readTypes'
import { withValidaton } from './utils'
import { ref } from './ref'

import { createEnumType } from './createEnumType'
import { createStringType } from './createStringType'
import { createNumberType } from './createNumberType'
import { createBooleanType } from './createBooleanType'
import { createDictionaryType } from './createDictionaryType'
import { createObjectType } from './createObjectType'
import { createArrayType } from './createArrayType'
import { createUnionType } from './createUnionType'

export function createType(input: Input<SchemaObject | ReferenceObject>, context: OpenAPIReadContext): Ref<Type> {
  const { data } = input
  const { config } = context

  // If it's a ref, in we can simply build a full URI and worry about it later
  if (isRefType(data)) {
    const uri = config.uri.resolve(data.$ref, input.uri)
    return ref(uri, context.model.types)
  }
  return withValidaton<Ref<Type>>(input, context, schemaValidator, () => {
    // If it's a schema we can switch on the type and go from there:
    switch (data.type) {
      case 'string': {
        if (!isNil(data.enum)) {
          return createEnumType(input, context)
        }
        return createStringType(input, context)
      }
      case 'number':
      case 'int':
      case 'integer':
      case 'float': {
        return createNumberType(input, context)
      }
      case 'boolean': {
        return createBooleanType(input, context)
      }
      case 'object': {
        if (!isNil(data.additionalProperties)) {
          return createDictionaryType(input, context)
        } else if (!isNil(data.properties)) {
          return createObjectType(input, context)
        } else if (Array.isArray(data.oneOf) && !isNil(data.discriminator)) {
          return createUnionType(input, context)
        }
      }
      case 'array': {
        return createArrayType(input, context)
      }
      default: {
        if (Array.isArray(data.oneOf)) {
          return createUnionType(input, context)
        }
        break
      }
    }
    throw new TypeError('No bueno')
  })
}
