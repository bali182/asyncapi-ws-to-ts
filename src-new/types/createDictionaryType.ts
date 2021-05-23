import { SchemaObject } from '../schema'
import { Ref, ModelType, Type, DictionaryType } from './types'
import { FactoryContext, FactoryInput } from '../FactoryContext'
import { noRef, ref } from './ref'
import { createType } from './createType'
import { isNil } from '../utils'

export function createDictionaryType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { name, data, uri } = input
  const { deprecated, description } = data
  const { model, config } = context

  const dictionaryType: DictionaryType = {
    __type: ModelType.DictionaryType,
    name,
    uri,
    deprecated,
    description,
    valueType: isNil(data.additionalProperties)
      ? noRef
      : createType(
          {
            ...input,
            data: data.additionalProperties,
            uri: config.path.append(uri, 'additionalProperties'),
            name: null,
          },
          context,
        ),
  }

  model.types.set(uri, dictionaryType)

  return ref(uri, model.types)
}
