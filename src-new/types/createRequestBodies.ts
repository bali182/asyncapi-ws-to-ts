import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ReferenceObject, RequestBodiesObject, RequestBodyObject, ResponseObject } from '../schema'
import { entries } from '../utils'
import { createRequestBody } from './createRequestBody'

export function createRequestBodies(input: FactoryInput<RequestBodiesObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries<RequestBodyObject | ReferenceObject>(data)) {
    const input: FactoryInput<RequestBodyObject | ReferenceObject> = {
      name,
      data: schema,
      uri: context.config.uri.append(uri, name),
    }
    createRequestBody(input, context)
  }
}
