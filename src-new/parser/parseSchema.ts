import { isNil } from '../utils'
import { createStringType } from './factories/createStringType'
import { createEnumType } from './factories/createEnumType'
import { createNumberType } from './factories/createNumberType'
import { createBooleanType } from './factories/createBooleanType'
import { createTypedObjectType } from './factories/createTypedObjectType'
import { createDictionaryType } from './factories/createDictionaryType'
import { FactoryContext } from './factories/FactoryContext'
import { SchemaObject } from '../schema'

export async function parseSchema(name: string, schema: SchemaObject, context: FactoryContext): Promise<string> {
  // First round if type is clearly defined:
  switch (schema.type) {
    case 'string':
      if (!isNil(schema.enum)) {
        return createEnumType(name, schema, context)
      } else {
        return createStringType(name, schema, context)
      }
    case 'number':
    case 'int':
    case 'integer':
    case 'float':
      return createNumberType(name, schema, context)
    case 'boolean':
      return createBooleanType(name, schema, context)
    case 'object':
      if (!isNil(schema.additionalProperties)) {
        return createDictionaryType(name, schema, context)
      } else {
        return createTypedObjectType(name, schema, context)
      }
    case 'array':
  }
  return null
}
