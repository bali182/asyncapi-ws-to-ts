import { OpenAPIReadContext, Input } from '../readTypes'
import { ReferenceObject, SchemaObject, SchemasObject } from '../../schema'
import { entries } from '../../utils'
import { createDiscriminatorFields } from './createDiscriminatorFields'
import { createType } from './createType'
import { ModelType, UnionType } from './types'

export function createTypes(input: Input<SchemasObject>, context: OpenAPIReadContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries(data)) {
    const input: Input<SchemaObject | ReferenceObject> = {
      name,
      data: schema,
      uri: context.config.uri.append(uri, name),
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
