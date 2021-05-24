import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ContentObject, HeaderObject, HeadersObject, MediaTypeObject, ReferenceObject, ResponseObject } from '../schema'
import { entries, isNil, isRefType, keys } from '../utils'
import { createHeader } from './createHeader'
import { createType } from './createType'
import { noRef, ref } from './ref'
import { HeaderParameterType, ModelType, Ref, ResponseType, Type } from './types'

function createResponseHeaders(input: FactoryInput<HeadersObject>, context: FactoryContext) {
  return entries(input.data || {}).map(([name, header]) =>
    createHeader(
      {
        name,
        data: header,
        uri: context.config.uri.append(input.uri, name),
      },
      context,
    ),
  )
}

function getContentType(input: FactoryInput<ContentObject>, context: FactoryContext): string {
  const { data, uri } = input
  // No response
  if (isNil(data)) {
    return null
  }
  const mediaTypes = keys(data)
  switch (mediaTypes.length) {
    // No media type meaning no response
    case 0:
      return null
    // 1 media type, we are in business
    case 1:
      return mediaTypes[0]
    // Any more media types, we can't handle that for now.
    default:
      throw new TypeError(`Expected single content type at ${uri}, got ${mediaTypes.join(', ')}.`)
  }
}

export function createResponse(
  statusCode: number,
  input: FactoryInput<ResponseObject | ReferenceObject>,
  context: FactoryContext,
): Ref<ResponseType> {
  const { data, uri } = input
  const { config, model } = context

  if (isRefType(data)) {
    return ref(config.uri.resolve(data.$ref, uri), model.responses)
  }

  const contentType: string = getContentType(
    {
      data: data.content,
      uri: config.uri.append(uri, 'content'),
      name: null,
    },
    context,
  )

  const type: Ref<Type> =
    !isNil(contentType) && !isNil(data?.content[contentType]?.schema)
      ? createType(
          {
            name: null,
            uri: config.uri.append(uri, 'content', contentType, 'schema'),
            data: data.content[contentType].schema,
          },
          context,
        )
      : noRef

  const headers: Ref<HeaderParameterType>[] = createResponseHeaders(
    {
      data: data.headers,
      uri: config.uri.append(uri, 'headers'),
      name: null,
    },
    context,
  )

  const response: ResponseType = {
    __type: ModelType.ResponseType,
    contentType,
    statusCode,
    type,
    headers,
  }

  model.responses.set(uri, response)

  return ref(uri, model.responses)
}
