import { OpenAPIObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'
import { resolveComponents } from './resolveComponents'
import { resolvePaths } from './resolvePaths'
import { validate } from './validate'
import { openApiObject } from './validators/openApiObject'
import { isNil } from '../../utils'

export async function resolveOpenAPIObject(input: ReadInput<OpenAPIObject>, context: ReadContext): Promise<void> {
  if (!validate(input, context, openApiObject)) {
    return
  }
  const { data, uri } = input
  const { paths, components } = data

  context.visited.add(uri)

  if (!isNil(paths)) {
    await resolvePaths({ data: paths, uri: context.uri.append(uri, 'paths') }, context)
  }
  if (!isNil(components)) {
    await resolveComponents({ data: components, uri: context.uri.append(uri, 'components') }, context)
  }
}
