import { PathsObject } from '../schema'
import { HttpMethod } from './types'
import { entries, isNil, values } from '../utils'
import { FactoryContext, FactoryInput } from '../FactoryContext'
import { createOperation } from './createOperation'

export function createOperations(input: FactoryInput<PathsObject>, context: FactoryContext): void {
  const { config } = context
  for (const [url, urlPath] of entries(input.data || {})) {
    const methods: HttpMethod[] = values(HttpMethod)
    for (const method of methods) {
      const operation = urlPath[method]
      if (!isNil(operation)) {
        createOperation(
          url,
          method,
          {
            ...input,
            data: operation,
            uri: config.uri.append(input.uri, url, method),
          },
          context,
        )
      }
    }
  }
}
