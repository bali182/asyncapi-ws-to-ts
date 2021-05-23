import { createContext, FactoryContext, OpenAPIConfig } from '../FactoryContext'
import { OpenAPIObject } from '../schema'
import { createParameters } from './createParameters'
import { createTypes } from './createTypes'

export function createOpenAPIModel(uri: string, openAPIModel: OpenAPIObject, config: OpenAPIConfig): FactoryContext {
  const { components, paths } = openAPIModel
  const { schemas, parameters, headers, requestBodies, responses } = components
  const context = createContext({ config })

  createTypes(
    {
      data: schemas || {},
      name: null,
      uri: config.path.append(uri, 'components', 'schemas'),
    },
    context,
  )

  createParameters(
    {
      data: parameters || {},
      name: null,
      uri: config.path.append(uri, 'components', 'parameters'),
    },
    context,
  )

  return context
}
