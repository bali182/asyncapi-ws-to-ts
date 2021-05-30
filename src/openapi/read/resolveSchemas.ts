import { ReferenceObject, SchemaObject } from 'openapi3-ts'
import { entries } from '../../utils'
import { resolveReferenceable } from './resolveReferenceable'
import { resolveSchemaObject } from './resolveSchemaObject'
import { ReadContext, ReadInput } from './types'
import { validate } from './validate'
import { recordOfObjects } from './validators/recordOfObjects'

export async function resolveSchemas(
  input: ReadInput<Record<string, SchemaObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {
  if (!validate(input, context, recordOfObjects)) {
    return
  }
  const { data, uri } = input
  for (const [name, schemaOrRef] of entries(data)) {
    await resolveReferenceable<SchemaObject>(
      { data: schemaOrRef, uri: context.uri.append(uri, name) },
      context,
      resolveSchemaObject,
    )
  }
}
