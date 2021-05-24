import { FactoryContext, FactoryInput } from '../FactoryContext'
import { OperationObject, ReferenceObject, ResponseObject } from '../schema'
import { entries } from '../utils'
import { createParameter } from './createParameter'
import { createResponse } from './createResponse'
import { noRef, ref } from './ref'
import { HttpMethod, ModelType, OperationType, Ref } from './types'

export function createOperation(
  url: string,
  method: HttpMethod,
  input: FactoryInput<OperationObject>,
  context: FactoryContext,
): Ref<OperationType> {
  const { config, model } = context
  const { data, uri } = input
  const { operationId, deprecated, description, parameters: _parameters, responses: _responses, requestBody } = data

  const parameters = (_parameters || []).map((parameter, i) =>
    createParameter(
      {
        ...input,
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
        name: null,
      },
      context,
    ),
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
    requestBody: noRef,
  }

  model.operations.set(uri, operation)

  return ref(uri, model.operations)
}
