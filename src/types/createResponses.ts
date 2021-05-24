import { OpenAPIModel, Input } from '../FactoryContext'
import { ResponsesObject } from '../schema'
import { entries } from '../utils'
import { createResponse } from './createResponse'

export function createResponses(input: Input<ResponsesObject>, context: OpenAPIModel): void {
  const { uri, data } = input

  for (const [name, schema] of entries(data)) {
    createResponse(
      parseInt(name),
      {
        name,
        data: schema,
        uri: context.config.uri.append(uri, name),
      },
      context,
    )
  }
}
