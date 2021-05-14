import { SchemaObject } from '../../schema'
import { ModelType, StringFormat, StringType } from '../../types'
import { FactoryContext } from './FactoryContext'

export async function createStringType(name: string, schema: SchemaObject, context: FactoryContext): Promise<string> {
  const { deprecated, description, format, maxLength, minLength, pattern } = schema

  const uri = 'TODO'
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
  context.types.push(stringType)
  return uri
}
