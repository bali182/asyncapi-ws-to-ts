import {
  PathsObject,
  PathItemObject,
  OperationObject,
  ReferenceObject,
  ResponseObject,
  ParameterObject,
} from '../schema'
import { Ref, HttpMethod, ModelType, OperationType, ParameterType, ResponseType } from './types'
import { entries, isNil, isRefType, values } from '../utils'
import { createType } from './createType'
import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ref } from './ref'

const InMap = {
  ['query']: ModelType.QueryParameterType,
  ['header']: ModelType.HeaderParameterType,
  ['path']: ModelType.PathParameterType,
  ['cookie']: ModelType.CookieParameterType,
}

export function createParameter(
  input: FactoryInput<ParameterObject | ReferenceObject>,
  context: FactoryContext,
): Ref<ParameterType> {
  const { data } = input
  if (isRefType(data)) {
    return ref(data.$ref, context.model.parameters)
  }
  const { allowEmptyValue, explode, name, deprecated, description, style, allowReserved, schema } = data
  const param: ParameterType = {
    __type: InMap[data.in] as any,
    allowEmptyValue,
    explode,
    name,
    style: style as any,
    urlEncode: !allowReserved,
    deprecated,
    description,
    type: createType(
      {
        ...input,
        data: data.schema,
      },
      context,
    ),
  }
  return null
}

export function createResponse(
  input: FactoryInput<ResponseObject | ReferenceObject>,
  context: FactoryContext,
): Ref<ResponseType> {
  const { data } = input
  if (isRefType(data)) {
    return ref(data.$ref, context.model.responses)
  }

  data.headers
  return null
}

export function createOperation(
  url: string,
  method: HttpMethod,
  input: FactoryInput<OperationObject>,
  context: FactoryContext,
): void {
  const { config, model } = context
  const { data, uri } = input
  const { operationId, deprecated, description, parameters = [] } = data
  const operation: OperationType = {
    __type: ModelType.OperationType,
    method,
    url,
    operationId,
    deprecated,
    description,
    uri,
    parameters: (parameters || []).map((parameter, i) =>
      createParameter(
        {
          ...input,
          uri: config.path.append(uri, 'parameters', i.toString()),
          data: parameter,
        },
        context,
      ),
    ),
    responses: [
      /* TODO */
    ],
  }
  model.operations.set(uri, operation)
}

export function createOperations(input: FactoryInput<PathsObject>, context: FactoryContext): void {
  const { config } = context
  for (const [url, urlPath] of entries<PathItemObject>(input)) {
    const methods: HttpMethod[] = values(HttpMethod)
    for (const method of methods) {
      const operation = urlPath[method]
      if (!isNil(operation)) {
        createOperation(
          url,
          method,
          {
            ...input,
            data: operation,
            uri: config.path.append(input.uri, url, method),
          },
          context,
        )
      }
    }
  }
}
