import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ReferenceObject, ResponseObject, ResponsesObject } from '../schema'
import { entries } from '../utils'
import { createResponse } from './createResponse'

export function createResponses(input: FactoryInput<ResponsesObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [status, schema] of entries(data)) {
    const input: FactoryInput<ResponseObject | ReferenceObject> = {
      name: null,
      data: schema,
      uri: context.config.uri.append(uri, status),
    }
    createResponse(parseInt(status), input, context)
  }
}
