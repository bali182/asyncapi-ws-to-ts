import { SchemaObject } from '../../schema'
import { ModelType, TypedObjectType } from '../../types'
import { FactoryContext } from './FactoryContext'

export async function createTypedObjectType(
  name: string,
  schema: SchemaObject,
  context: FactoryContext,
): Promise<string> {
  const { deprecated, description } = schema
  const uri = 'TODO'

  const objectType: TypedObjectType = {
    __type: ModelType.TypedObjectType,
    name,
    uri,
    deprecated,
    description,
    fields: null,
  }

  context.types.push(objectType)

  return uri
}
