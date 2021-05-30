import { isReferenceObject } from 'openapi3-ts'
import { SchemaObject } from '../../schema'
import { entries, isNil } from '../../utils'
import { resolveReference } from './resolveReference'
import { ReadContext, ReadInput } from './types'
import { validate } from './validate'
import { schemaObject } from './validators/schemaObject'

export async function resolveSchemaObject(input: ReadInput<SchemaObject>, context: ReadContext): Promise<void> {
  if (!validate(input, context, schemaObject)) {
    return
  }

  const { data, uri } = input
  const { items, not, allOf, oneOf, anyOf, properties, additionalProperties, discriminator } = data

  if (!isNil(items)) {
    const itemsUri = context.uri.append(uri, 'items')
    if (isReferenceObject(items)) {
      await resolveReference({ data: items, uri: itemsUri }, context)
    } else {
      await resolveSchemaObject({ data: items, uri: itemsUri }, context)
    }
  }
  if (!isNil(not)) {
    const notUri = context.uri.append(uri, 'not')
    if (isReferenceObject(not)) {
      await resolveReference({ data: not, uri: notUri }, context)
    } else {
      await resolveSchemaObject({ data: not, uri: notUri }, context)
    }
  }
  if (!isNil(additionalProperties)) {
    const apUri = context.uri.append(uri, 'additionalProperties')
    if (isReferenceObject(additionalProperties)) {
      await resolveReference({ data: additionalProperties, uri: apUri }, context)
    } else {
      await resolveSchemaObject({ data: additionalProperties, uri: apUri }, context)
    }
  }
  if (!isNil(allOf)) {
    for (let i = 0; i < allOf.length; i += 1) {
      const item = allOf[i]
      const itemUri = context.uri.append(uri, 'allOf', i.toString())
      if (isReferenceObject(item)) {
        await resolveReference({ data: item, uri: itemUri }, context)
      } else {
        await resolveSchemaObject({ data: item, uri: itemUri }, context)
      }
    }
  }
  if (!isNil(oneOf)) {
    for (let i = 0; i < oneOf.length; i += 1) {
      const item = oneOf[i]
      const itemUri = context.uri.append(uri, 'oneOf', i.toString())
      if (isReferenceObject(item)) {
        await resolveReference({ data: item, uri: itemUri }, context)
      } else {
        await resolveSchemaObject({ data: item, uri: itemUri }, context)
      }
    }
  }
  if (!isNil(anyOf)) {
    for (let i = 0; i < anyOf.length; i += 1) {
      const item = anyOf[i]
      const itemUri = context.uri.append(uri, 'anyOf', i.toString())
      if (isReferenceObject(item)) {
        await resolveReference({ data: item, uri: itemUri }, context)
      } else {
        await resolveSchemaObject({ data: item, uri: itemUri }, context)
      }
    }
  }
  if (!isNil(properties)) {
    for (const [name, propSchema] of entries(properties)) {
      const propUri = context.uri.append(uri, 'properties', name)
      if (isReferenceObject(propSchema)) {
        await resolveReference({ data: propSchema, uri: propUri }, context)
      } else {
        await resolveSchemaObject({ data: propSchema, uri: propUri }, context)
      }
    }
  }
}
