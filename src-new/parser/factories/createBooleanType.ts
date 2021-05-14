import { SchemaObject } from '../../schema'
import { BooleanType, ModelType } from '../../types'
import { FactoryContext } from './FactoryContext'

export async function createBooleanType(name: string, schema: SchemaObject, context: FactoryContext): Promise<string> {
  const { deprecated, description } = schema
  const uri = 'TODO'

  const booleanType: BooleanType = {
    __type: ModelType.BooleanType,
    uri,
    name,
    deprecated,
    description,
  }

  context.types.push(booleanType)

  return uri
}
