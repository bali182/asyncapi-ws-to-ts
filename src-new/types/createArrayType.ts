import { SchemaObject } from '../schema'
import { Ref, ModelType, ArrayType, Type } from './types'
import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { ref, noRef } from './ref'
import { createType } from './createType'
import { isNil } from '../utils'

export function createArrayType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { name, data, uri, pathAccessor: a } = input
  const { deprecated, description, maxItems, minItems, uniqueItems } = data

  const arrayType: ArrayType = {
    __type: ModelType.ArrayType,
    name,
    uri,
    deprecated,
    description,
    maxItems,
    minItems,
    uniqueItems,
    itemType: isNil(data.items)
      ? noRef
      : createType(
          {
            ...input,
            data: data.items,
            uri: a.append(uri, 'items'),
            name: null,
          },
          context,
        ),
  }

  context.types.set(uri, arrayType)

  return ref(uri, context.types)
}
