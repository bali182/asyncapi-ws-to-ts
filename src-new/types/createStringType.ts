import { SchemaObject } from '../schema'
import { Ref, ModelType, StringFormat, StringType, Type } from './types'
import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { ref } from './ref'

export function createStringType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
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
    format: format as StringFormat,
  }
  context.types.set(uri, stringType)

  return ref(uri, context.types)
}
