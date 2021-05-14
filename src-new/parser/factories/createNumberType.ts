import { SchemaObject } from '../../schema'
import { ModelType, NumberFormat, NumberType } from '../../types'
import { FactoryContext } from './FactoryContext'

function createNumberFormat(schema: SchemaObject): NumberFormat {
  if (schema.type === 'integer' || schema.type === 'int') {
    return NumberFormat.Integer
  }
  if (schema.type === 'float' || schema.type === 'number') {
    return NumberFormat.Float
  }
}

export async function createNumberType(name: string, schema: SchemaObject, context: FactoryContext): Promise<string> {
  const { deprecated, description, multipleOf, minimum, maximum, exclusiveMinimum, exclusiveMaximum } = schema
  const uri = 'TODO'

  const numerType: NumberType = {
    __type: ModelType.NumberType,
    uri,
    name,
    deprecated,
    description,
    multipleOf,
    minimum,
    maximum,
    exclusiveMinimum,
    exclusiveMaximum,
    format: createNumberFormat(schema),
  }

  context.types.push(numerType)

  return uri
}
