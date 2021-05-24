import { FactoryContext, FactoryInput } from '../FactoryContext'
import { HeadersObject } from '../schema'
import { entries } from '../utils'
import { createHeader } from './createHeader'

export function createHeaders(input: FactoryInput<HeadersObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries(data)) {
    createHeader(
      {
        name,
        data: schema,
        uri: context.config.uri.append(uri, name),
      },
      context,
    )
  }
}
