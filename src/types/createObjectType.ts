import { SchemaObject } from '../schema'
import { Ref, ModelType, ObjectType, ObjectField, Type } from './types'
import { FactoryContext, FactoryInput } from '../FactoryContext'
import { noRef, ref } from './ref'
import { createType } from './createType'
import { entries, isNil } from '../utils'

function createObjectField(input: FactoryInput<SchemaObject>, context: FactoryContext): ObjectField[] {
  const { data, uri } = input
  const { properties } = data
  const { config } = context

  return entries(properties || {}).map(
    ([propName, propSchema]): ObjectField => {
      const propUri = config.uri.append(uri, 'properties', propName)
      return {
        __type: ModelType.ObjectField,
        isRequired: (data.required || []).indexOf(propName) >= 0,
        name: propName,
        type: isNil(propSchema)
          ? noRef
          : createType(
              {
                uri: propUri,
                data: propSchema,
              },
              context,
            ),
        uri: propUri,
      }
    },
  )
}

export function createObjectType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { name, data, uri } = input
  const { deprecated, description } = data
  const { model } = context

  const objectType: ObjectType = {
    __type: ModelType.ObjectType,
    name,
    uri,
    deprecated,
    description,
    discriminators: [],
    fields: createObjectField(input, context),
  }

  model.types.set(uri, objectType)

  return ref(uri, model.types)
}
