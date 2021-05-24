import { SchemaObject } from '../schema'
import { Ref, ModelType, StringType, Type } from './types'
import { OpenAPIModel, Input } from '../FactoryContext'
import { ref } from './ref'

export function createStringType(input: Input<SchemaObject>, context: OpenAPIModel): Ref<Type> {
  const { name, data, uri } = input
  const { deprecated, description, format, maxLength, minLength, pattern } = data

  const stringType: StringType = {
    __type: ModelType.StringType,
    name,
    uri,
    deprecated,
    description,
    maxLength,
    minLength,
    pattern,
    format,
  }
  context.model.types.set(uri, stringType)

  return ref(uri, context.model.types)
}
