import { DiscriminatorObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'
import { validate } from './validate'
import { entries, isNil } from '../../utils'
import { discriminatorObject } from './validators/discriminatorObject'
import { resolveReferenceUri } from './resolveReference'
import { SchemaObject } from '../../schema'
import { resolveSchemaObject } from './resolveSchemaObject'

export async function resolveDiscriminatorObject(
  input: ReadInput<DiscriminatorObject>,
  context: ReadContext,
): Promise<void> {
  if (!validate(input, context, discriminatorObject)) {
    return
  }
  const { data, uri } = input
  const { mapping } = data

  if (!isNil(mapping)) {
    for (const [key, ref] of entries(mapping)) {
      const schemaObject = resolveReferenceUri<SchemaObject>(
        { data: ref, uri: context.uri.append(uri, 'mapping', key) },
        context,
      )
      await resolveSchemaObject({})
    }
  }
}
