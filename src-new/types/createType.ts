import { schemaValidator } from '../sanitization/schemaObject'
import { ReferenceObject, SchemaObject } from '../schema'
import { Ref, Type } from './types'
import { isNil, isRefType } from '../utils'
import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { withValidaton } from '../parser/factories/utils'
import { ref } from './ref'
import { resolveUri } from '../parser/factories/resolveUri'

import { createEnumType } from './createEnumType'
import { createStringType } from './createStringType'
import { createNumberType } from './createNumberType'
import { createBooleanType } from './createBooleanType'
import { createDictionaryType } from './createDictionaryType'
import { createTypedObjectType } from './createTypedObjectType'
import { createArrayType } from './createArrayType'
import { createUnionType } from './createUnionType'

export function createType(input: FactoryInput<SchemaObject | ReferenceObject>, context: FactoryContext): Ref<Type> {
  const { data } = input

  // If it's a ref, in we can simply build a full URI and worry about it later
  if (isRefType(data)) {
    const preparedUri = resolveUri(data.$ref, input.uri, context.transformRef)
    return ref(preparedUri, context.model.types)
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
        } else {
          return createTypedObjectType(input, context)
        }
      }
      case 'array': {
        return createArrayType(input, context)
      }
      default: {
        if (Array.isArray(data.oneOf)) {
          return createUnionType(input, context)
        }
      }
    }
    return null
  })
}
