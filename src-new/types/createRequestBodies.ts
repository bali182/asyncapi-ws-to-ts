import { FactoryContext, FactoryInput } from '../FactoryContext'
import { RequestBodiesObject } from '../schema'
import { entries } from '../utils'
import { createRequestBody } from './createRequestBody'

export function createRequestBodies(input: FactoryInput<RequestBodiesObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries(data || {})) {
    createRequestBody(
      {
        name,
        data: schema,
        uri: context.config.uri.append(uri, name),
      },
      context,
    )
  }
}
