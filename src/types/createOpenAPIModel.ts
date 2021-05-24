import { createContext, FactoryContext, OpenAPIConfig } from '../FactoryContext'
import { OpenAPIObject } from '../schema'
import { createHeaders } from './createHeaders'
import { createOperations } from './createOperations'
import { createParameters } from './createParameters'
import { createRequestBodies } from './createRequestBodies'
import { createResponses } from './createResponses'
import { createTypes } from './createTypes'

export function createOpenAPIModel(uri: string, openAPIModel: OpenAPIObject, config: OpenAPIConfig): FactoryContext {
  const context = createContext({ config })
  const _uri = context.config.uri.sanitize(uri)

  const { components, paths } = openAPIModel
  const { schemas, parameters, headers, requestBodies, responses } = components

  createTypes(
    {
      data: schemas || {},
      uri: context.config.uri.append(_uri, 'components', 'schemas'),
    },
    context,
  )

  createParameters(
    {
      data: parameters || {},
      uri: context.config.uri.append(_uri, 'components', 'parameters'),
    },
    context,
  )

  createHeaders(
    {
      data: headers || {},
      uri: context.config.uri.append(_uri, 'components', 'headers'),
    },
    context,
  )

  createResponses(
    {
      data: responses || {},
      uri: context.config.uri.append(_uri, 'components', 'responses'),
    },
    context,
  )

  createRequestBodies(
    {
      data: requestBodies || {},
      uri: context.config.uri.append(_uri, 'components', 'requestBodies'),
    },
    context,
  )

  createOperations(
    {
      data: paths || {},
      uri: context.config.uri.append(_uri, 'paths'),
    },
    context,
  )

  return context
}
