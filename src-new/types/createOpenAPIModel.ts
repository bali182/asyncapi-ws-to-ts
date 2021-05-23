import { createContext, FactoryContext, OpenAPIConfig } from '../FactoryContext'
import { OpenAPIObject } from '../schema'
import { createParameters } from './createParameters'
import { createTypes } from './createTypes'

export function createOpenAPIModel(uri: string, openAPIModel: OpenAPIObject, config: OpenAPIConfig): FactoryContext {
  const context = createContext({ config })
  const _uri = context.config.uri.sanitize(uri)
  const { components, paths } = openAPIModel
  const { schemas, parameters, headers, requestBodies, responses } = components

  createTypes(
    {
      data: schemas || {},
      name: null,
      uri: context.config.uri.append(_uri, 'components', 'schemas'),
    },
    context,
  )

  createParameters(
    {
      data: parameters || {},
      name: null,
      uri: context.config.uri.append(_uri, 'components', 'parameters'),
    },
    context,
  )

  return context
}
