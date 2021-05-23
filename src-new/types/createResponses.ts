import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ReferenceObject, ResponseObject, ResponsesObject } from '../schema'
import { entries } from '../utils'
import { createResponse } from './createResponse'

export function createResponses(input: FactoryInput<ResponsesObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries<ResponseObject | ReferenceObject>(data)) {
    const input: FactoryInput<ResponseObject | ReferenceObject> = {
      name,
      data: schema,
      uri: context.config.uri.append(uri, name),
    }
    createResponse(input, context)
  }
}
