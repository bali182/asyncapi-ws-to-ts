import { FactoryContext, FactoryInput } from '../FactoryContext'
import { OperationObject } from '../schema'
import { createParameter } from './createParameter'
import { HttpMethod, ModelType, OperationType } from './types'

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
          uri: config.uri.append(uri, 'parameters', i.toString()),
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
