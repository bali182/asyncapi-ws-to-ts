import { OpenAPIModel, Input } from '../FactoryContext'
import { OperationObject } from '../schema'
import { entries, isNil } from '../utils'
import { createParameter } from './createParameter'
import { createRequestBody } from './createRequestBody'
import { createResponse } from './createResponse'
import { noRef, ref } from './ref'
import { HttpMethod, ModelType, OperationType, Ref } from './types'

export function createOperation(
  url: string,
  method: HttpMethod,
  input: Input<OperationObject>,
  context: OpenAPIModel,
): Ref<OperationType> {
  const { config, model } = context
  const { data, uri } = input
  const {
    operationId,
    deprecated,
    description,
    parameters: _parameters,
    responses: _responses,
    requestBody: _requestBody,
  } = data

  const parameters = (_parameters || []).map((parameter, i) =>
    createParameter(
      {
        uri: config.uri.append(uri, 'parameters', i.toString()),
        data: parameter,
      },
      context,
    ),
  )

  const responses = entries(_responses || {}).map(([status, response]) =>
    createResponse(
      status === 'default' ? null : parseInt(status),
      {
        data: response,
        uri: config.uri.append(uri, 'responses', status),
      },
      context,
    ),
  )

  const requestBody = isNil(_requestBody)
    ? noRef
    : createRequestBody(
        {
          data: _requestBody,
          uri: config.uri.append(uri, 'requestBody'),
        },
        context,
      )

  const operation: OperationType = {
    __type: ModelType.OperationType,
    method,
    url,
    operationId,
    deprecated,
    description,
    uri,
    parameters,
    responses,
    requestBody,
  }

  model.operations.set(uri, operation)

  return ref(uri, model.operations)
}
