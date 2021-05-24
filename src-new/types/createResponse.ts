import { FactoryContext, FactoryInput } from '../FactoryContext'
import { HeadersObject, ReferenceObject, ResponseObject } from '../schema'
import { entries, isNil, isRefType } from '../utils'
import { createHeader } from './createHeader'
import { createType } from './createType'
import { getContentType } from './getContentType'
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

export function createResponse(
  statusCode: number,
  input: FactoryInput<ResponseObject | ReferenceObject>,
  context: FactoryContext,
): Ref<ResponseType> {
  const { data, uri, name } = input
  const { config, model } = context

  if (isRefType(data)) {
    return ref(config.uri.resolve(data.$ref, uri), model.responses)
  }

  const contentType: string = getContentType(
    {
      uri: config.uri.append(uri, 'content'),
      data: data.content,
    },
    context,
  )

  const type: Ref<Type> =
    !isNil(contentType) && !isNil(data?.content[contentType]?.schema)
      ? createType(
          {
            uri: config.uri.append(uri, 'content', contentType, 'schema'),
            data: data.content[contentType].schema,
          },
          context,
        )
      : noRef

  const headers: Ref<HeaderParameterType>[] = createResponseHeaders(
    {
      uri: config.uri.append(uri, 'headers'),
      data: data.headers,
    },
    context,
  )

  const response: ResponseType = {
    __type: ModelType.ResponseType,
    name,
    contentType,
    statusCode,
    type,
    headers,
  }

  model.responses.set(uri, response)

  return ref(uri, model.responses)
}
