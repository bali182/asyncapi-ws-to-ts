import { SchemaObject } from '../schema'
import { Ref, ModelType, BooleanType, Type } from './types'
import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { ref } from './ref'

export function createBooleanType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
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
