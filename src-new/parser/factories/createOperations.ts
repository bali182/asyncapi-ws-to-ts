import {
  PathsObject,
  PathItemObject,
  OperationObject,
  ReferenceObject,
  BaseParameterObject,
  ResponseObject,
  ParameterObject,
  ParameterLocation,
} from '../../schema'
import { $RefType, HttpMethod, ModelType, OperationType, ParameterType } from '../../types'
import { entries, isNil, isRefType, values } from '../../utils'
import { createQualifiedRef } from './createQualifiedRef'
import { createType } from './createType'
import { FactoryContext } from './FactoryContext'

const InMap = {
  ['query']: ModelType.QueryParameterType,
  ['header']: ModelType.HeaderParameterType,
  ['path']: ModelType.PathParameterType,
  ['cookie']: ModelType.CookieParameterType,
}

export function createParameter(context: FactoryContext<ParameterObject | ReferenceObject>): $RefType {
  const { data } = context
  if (isRefType(data)) {
    return {
      __type: ModelType.$RefType,
      uri: createQualifiedRef(data, context),
    }
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
    type: createType({
      ...context,
      data: data.schema,
    }),
  }
  return null
}

export function createResponse(context: FactoryContext<ResponseObject | ReferenceObject>): $RefType {
  const { data } = context
  if (isRefType(data)) {
    return {
      __type: ModelType.$RefType,
      uri: createQualifiedRef(data, context), // TODO
    }
  }

  data.headers
  return null
}

export function createOperation(url: string, method: HttpMethod, context: FactoryContext<OperationObject>): void {
  const { data, uri, pathAccessor: a } = context
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
      createParameter({
        ...context,
        uri: a.append(uri, 'parameters', i.toString()),
        data: parameter,
      }),
    ),
    responses: [
      /* TODO */
    ],
  }
  context.operations.push(operation)
}

export function createOperations(context: FactoryContext<PathsObject>): void {
  const { pathAccessor: a } = context
  for (const [url, path] of entries<PathItemObject>(context)) {
    const methods: HttpMethod[] = values(HttpMethod)
    for (const method of methods) {
      const operation = path[method]
      if (!isNil(operation)) {
        createOperation(url, method, {
          ...context,
          data: operation,
          uri: a.append(context.uri, url, method),
        })
      }
    }
  }
}
