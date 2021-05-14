import { SchemaObject } from '../../schema'
import { ArrayType, ModelType } from '../../types'
import { FactoryContext } from './FactoryContext'

export async function createArrayType(name: string, schema: SchemaObject, context: FactoryContext): Promise<string> {
  const { deprecated, description, maxItems, minItems, uniqueItems } = schema
  const uri = 'TODO'
  const arrayType: ArrayType = {
    __type: ModelType.ArrayType,
    name,
    uri,
    deprecated,
    description,
    maxItems,
    minItems,
    uniqueItems,
    itemType: null,
    __itemTypeRef: 'TODO',
  }
  context.types.push(arrayType)
  return uri
}
