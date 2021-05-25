import { OpenAPIReadContext, Input } from '../OpenAPIReadContext'
import { OpenAPIObject } from '../../schema'
import { createHeaders } from './createHeaders'
import { createOperations } from './createOperations'
import { createParameters } from './createParameters'
import { createRequestBodies } from './createRequestBodies'
import { createResponses } from './createResponses'
import { createTypes } from './createTypes'

export function createOpenAPIModel(input: Input<OpenAPIObject>, context: OpenAPIReadContext): OpenAPIReadContext {
  const { data, uri } = input
  const { components, paths } = data
  const { schemas, parameters, headers, requestBodies, responses } = components || {}

  createTypes(
    {
      data: schemas || {},
      uri: context.config.uri.append(uri, 'components', 'schemas'),
    },
    context,
  )

  createParameters(
    {
      data: parameters || {},
      uri: context.config.uri.append(uri, 'components', 'parameters'),
    },
    context,
  )

  createHeaders(
    {
      data: headers || {},
      uri: context.config.uri.append(uri, 'components', 'headers'),
    },
    context,
  )

  createResponses(
    {
      data: responses || {},
      uri: context.config.uri.append(uri, 'components', 'responses'),
    },
    context,
  )

  createRequestBodies(
    {
      data: requestBodies || {},
      uri: context.config.uri.append(uri, 'components', 'requestBodies'),
    },
    context,
  )

  createOperations(
    {
      data: paths || {},
      uri: context.config.uri.append(uri, 'paths'),
    },
    context,
  )

  return context
}
