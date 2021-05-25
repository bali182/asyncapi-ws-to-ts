import { OpenAPIReadContext, Input } from '../readTypes'
import { ReferenceObject, RequestBodyObject } from '../../schema'
import { isNil, isRefType } from '../../utils'
import { createType } from './createType'
import { getContentType } from './getContentType'
import { noRef, ref } from './ref'
import { ModelType, Ref, RequestBodyType, Type } from './types'

export function createRequestBody(
  input: Input<RequestBodyObject | ReferenceObject>,
  context: OpenAPIReadContext,
): Ref<RequestBodyType> {
  const { data, uri, name } = input
  const { model, config } = context

  if (isRefType(data)) {
    return ref(config.uri.resolve(data.$ref, uri), model.responses)
  }

  const { content, description, required } = data

  const contentType: string = getContentType(
    {
      data: content,
      uri: config.uri.append(uri, 'content'),
    },
    context,
  )

  const type: Ref<Type> =
    !isNil(contentType) && !isNil(content[contentType]?.schema)
      ? createType(
          {
            uri: config.uri.append(uri, 'content', contentType, 'schema'),
            data: content[contentType].schema,
          },
          context,
        )
      : noRef

  const reqBody: RequestBodyType = {
    __type: ModelType.RequestBodyType,
    name,
    uri,
    contentType,
    description,
    type,
    isRequired: required,
  }

  model.requestBodies.set(uri, reqBody)

  return ref(uri, model.responses)
}
