import { OpenAPIReadContext, Input } from '../readTypes'
import { RequestBodiesObject } from '../../schema'
import { entries } from '../../utils'
import { createRequestBody } from './createRequestBody'

export function createRequestBodies(input: Input<RequestBodiesObject>, context: OpenAPIReadContext): void {
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
