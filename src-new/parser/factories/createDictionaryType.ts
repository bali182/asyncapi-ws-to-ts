import { SchemaObject } from '../../schema'
import { DictionaryType, ModelType } from '../../types'
import { FactoryContext } from './FactoryContext'

export async function createDictionaryType(
  name: string,
  schema: SchemaObject,
  context: FactoryContext,
): Promise<string> {
  const { deprecated, description } = schema
  const uri = 'TODO'

  const dictionaryType: DictionaryType = {
    __type: ModelType.DictionaryType,
    name,
    uri,
    deprecated,
    description,
    valueType: null,
  }
  context.types.push(dictionaryType)
  return uri
}
