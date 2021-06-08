import { BaseParameterObject, HeaderObject, ParameterObject } from 'openapi3-ts'
import { entries, isNil } from '../../utils'
import { Validator } from '../../validation/typings'
import { register } from './register'
import { resolveMediaTypeObject } from './resolveMediaTypeObject'
import { resolveReferenceable } from './resolveReferenceable'
import { resolveSchemaObject } from './resolveSchemaObject'
import { ReadContext, ReadInput } from './types'
import { validate } from './validate'
import { headerObject, parameterObject } from './validators/parameterObject'

const resolveBaseParameter =
  <T extends BaseParameterObject>(validator: Validator<any>) =>
  async (input: ReadInput<T>, context: ReadContext): Promise<void> => {
    if (!validate(input, context, validator)) {
      return
    }

    register(input, context)

    const { data, uri } = input
    const { content, schema } = data

    if (!isNil(schema)) {
      await resolveReferenceable({ data: schema, uri: context.uri.append(uri, 'schema') }, context, resolveSchemaObject)
    }

    if (!isNil(content)) {
      for (const [key, mediaTypeObject] of entries(content)) {
        await resolveMediaTypeObject({ data: mediaTypeObject, uri: context.uri.append(uri, 'content', key) }, context)
      }
    }
  }

export const resolveHeaderObject = resolveBaseParameter<HeaderObject>(headerObject)

export const resolveParameterObject = resolveBaseParameter<ParameterObject>(parameterObject)
