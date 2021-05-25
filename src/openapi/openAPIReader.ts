import { Input, OpenAPIReadConfig, OpenAPIReadModel } from './readTypes'
import { OpenAPIObject } from '../schema'
import { createOpenAPIModel } from './types/createOpenAPIModel'
import { resolveUriTarget } from '../uri/resolveUriTarget'
import { createContext, createConfig } from './defaults'

export const openAPIReader = (config?: Partial<OpenAPIReadConfig>) => async (): Promise<OpenAPIReadModel> => {
  const context = createContext({ config: createConfig(config) })

  const uri = context.config.uri.sanitize(context.config.root)
  const data = await resolveUriTarget<OpenAPIObject>(uri)

  createOpenAPIModel({ uri, data }, context)

  return context.model
}
