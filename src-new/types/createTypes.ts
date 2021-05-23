import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ReferenceObject, SchemaObject, SchemasObject } from '../schema'
import { entries } from '../utils'
import { createDiscriminatorFields } from './createDiscriminatorFields'
import { createType } from './createType'
import { ModelType, UnionType } from './types'

export function createTypes(input: FactoryInput<SchemasObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries<SchemaObject | ReferenceObject>(data)) {
    const input: FactoryInput<SchemaObject | ReferenceObject> = {
      name,
      data: schema,
      uri: context.config.path.append(uri, name),
    }
    createType(input, context)
  }

  const unionTypes = Array.from(context.model.types.values()).filter(
    (type) => type.__type === ModelType.UnionType,
  ) as UnionType[]

  for (const unionType of unionTypes) {
    createDiscriminatorFields(unionType)
  }
}
