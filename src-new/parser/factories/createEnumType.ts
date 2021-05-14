import { isNil } from '../../utils'
import { SchemaObject } from '../../schema'
import { EnumType, EnumValue, ModelType } from '../../types'
import { FactoryContext } from './FactoryContext'

function getEnumVarNames(schema: SchemaObject): string[] {
  const xEnumVarNames = schema['x-enum-varnames']
  return isNil(xEnumVarNames) ? Array.from(schema.enum) : xEnumVarNames
}

function getEnumDescriptions(schema: SchemaObject): string[] {
  const xEnumDescriptions = schema['x-enum-descriptions']
  return isNil(xEnumDescriptions) ? schema.enum.map(() => null) : xEnumDescriptions
}

function getEnumValues(schema: SchemaObject): string[] {
  return schema.enum
}

function createEnumValues(schema: SchemaObject): EnumValue[] {
  const stringValues = getEnumValues(schema)
  const varNames = getEnumVarNames(schema)
  const descriptions = getEnumDescriptions(schema)

  return stringValues.map((value, index) => {
    const name = varNames[index]
    const description = descriptions[index]
    return {
      __type: ModelType.EnumValue,
      uri: 'TODO',
      name,
      value,
      description,
    }
  })
}

export async function createEnumType(name: string, schema: SchemaObject, context: FactoryContext): Promise<string> {
  const { description, deprecated } = schema
  const uri = 'TODO'

  const enumType: EnumType = {
    __type: ModelType.EnumType,
    uri,
    name,
    description,
    deprecated,
    values: createEnumValues(schema),
  }

  context.types.push(enumType)

  return uri
}
