import { SchemaObject } from '../schema'
import { Ref, ModelType, BooleanType, Type } from './types'
import { OpenAPIModel, Input } from '../FactoryContext'
import { ref } from './ref'

export function createBooleanType(input: Input<SchemaObject>, context: OpenAPIModel): Ref<Type> {
  const { name, data, uri } = input
  const { deprecated, description } = data

  const booleanType: BooleanType = {
    __type: ModelType.BooleanType,
    uri,
    name,
    deprecated,
    description,
  }

  context.model.types.set(uri, booleanType)

  return ref(uri, context.model.types)
}
