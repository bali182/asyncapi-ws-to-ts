import { SchemaObject } from '../../schema'
import { Ref, EnumType, EnumValue, ModelType, Type } from './types'
import { isNil } from '../../utils'
import { OpenAPIReadContext, Input } from '../OpenAPIReadContext'
import { ref } from './ref'

function createEnumValues(input: Input<SchemaObject>, context: OpenAPIReadContext): EnumValue[] {
  const { data, uri } = input
  const varNames = isNil(data['x-enum-varnames']) ? Array.from(data.enum) : data['x-enum-varnames']
  const descriptions = isNil(data['x-enum-descriptions']) ? data.enum.map(() => null) : data['x-enum-descriptions']
  const { config } = context

  return data.enum.map((value, index) => {
    const name = varNames[index]
    const description = descriptions[index]
    return {
      __type: ModelType.EnumValue,
      uri: config.uri.append(uri, index.toString()),
      name,
      value,
      description,
    }
  })
}

export function createEnumType(input: Input<SchemaObject>, context: OpenAPIReadContext): Ref<Type> {
  const { name, data, uri } = input
  const { description, deprecated } = data
  const { model } = context

  const enumType: EnumType = {
    __type: ModelType.EnumType,
    uri,
    name,
    description,
    deprecated,
    values: createEnumValues(input, context),
  }

  model.types.set(uri, enumType)

  return ref(uri, model.types)
}
