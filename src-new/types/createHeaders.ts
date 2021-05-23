import { FactoryContext, FactoryInput } from '../FactoryContext'
import { HeaderObject, HeadersObject, ReferenceObject } from '../schema'
import { entries } from '../utils'
import { createHeader } from './createHeader'

export function createHeaders(input: FactoryInput<HeadersObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries<HeaderObject | ReferenceObject>(data)) {
    const input: FactoryInput<HeaderObject | ReferenceObject> = {
      name,
      data: schema,
      uri: context.config.uri.append(uri, name),
    }
    createHeader(input, context)
  }
}
