import { SchemaObject } from '../schema'
import { Ref, ModelType, ArrayType, Type } from './types'
import { OpenAPIModel, Input } from '../FactoryContext'
import { ref, noRef } from './ref'
import { createType } from './createType'
import { isNil } from '../utils'

export function createArrayType(input: Input<SchemaObject>, context: OpenAPIModel): Ref<Type> {
  const { name, data, uri } = input
  const { deprecated, description, maxItems, minItems, uniqueItems } = data
  const { model, config } = context

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
            data: data.items,
            uri: config.uri.append(uri, 'items'),
          },
          context,
        ),
  }

  model.types.set(uri, arrayType)

  return ref(uri, model.types)
}
