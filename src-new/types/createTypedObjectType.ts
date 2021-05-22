import { ReferenceObject, SchemaObject } from '../schema'
import { Ref, ModelType, TypedObjectType, TypedObjectTypeField, Type } from './types'
import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { noRef, ref } from './ref'
import { createType } from './createType'
import { entries, isNil } from '../utils'

function createTypedObjectTypeFields(
  input: FactoryInput<SchemaObject>,
  context: FactoryContext,
): TypedObjectTypeField[] {
  const { data, uri } = input
  const { properties } = data
  return entries<SchemaObject | ReferenceObject>(properties || {}).map(
    ([propName, propSchema]): TypedObjectTypeField => {
      const propUri = context.path.append(uri, 'properties', propName)
      return {
        __type: ModelType.TypedObjectTypeField,
        isRequired: (data.required || []).indexOf(propName) >= 0,
        name: propName,
        type: isNil(propSchema)
          ? noRef
          : createType(
              {
                ...input,
                uri: propUri,
                name: null,
                data: propSchema,
              },
              context,
            ),
        uri: propUri,
      }
    },
  )
}

export function createTypedObjectType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { name, data, uri } = input
  const { deprecated, description } = data

  const objectType: TypedObjectType = {
    __type: ModelType.TypedObjectType,
    name,
    uri,
    deprecated,
    description,
    fields: createTypedObjectTypeFields(input, context),
  }

  context.model.types.set(uri, objectType)

  return ref(uri, context.model.types)
}
