import { SchemaObject } from '../schema'
import { Ref, EnumType, EnumValue, ModelType, Type } from './types'
import { isNil } from '../utils'
import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { ref } from './ref'

function createEnumValues(input: FactoryInput<SchemaObject>, context: FactoryContext): EnumValue[] {
  const { data, uri } = input
  const varNames = isNil(data['x-enum-varnames']) ? Array.from(data.enum) : data['x-enum-varnames']
  const descriptions = isNil(data['x-enum-descriptions']) ? data.enum.map(() => null) : data['x-enum-descriptions']

  return data.enum.map((value, index) => {
    const name = varNames[index]
    const description = descriptions[index]
    return {
      __type: ModelType.EnumValue,
      uri: context.path.append(uri, index.toString()),
      name,
      value,
      description,
    }
  })
}

export function createEnumType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { name, data, uri } = input
  const { description, deprecated } = data

  const enumType: EnumType = {
    __type: ModelType.EnumType,
    uri,
    name,
    description,
    deprecated,
    values: createEnumValues(input, context),
  }

  context.model.types.set(uri, enumType)

  return ref(uri, context.model.types)
}
