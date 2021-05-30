import { isReferenceObject, ReferenceObject, SchemaObject } from 'openapi3-ts'
import { entries } from '../../utils'
import { resolveReference } from './resolveReference'
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
    const schema = isReferenceObject(schemaOrRef)
      ? await resolveReference<SchemaObject>(
          {
            data: schemaOrRef,
            uri: context.uri.append(uri, name),
          },
          context,
        )
      : schemaOrRef
  }
}
