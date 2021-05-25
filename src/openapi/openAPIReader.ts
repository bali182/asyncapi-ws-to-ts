import { Input } from './OpenAPIReadContext'
import { OpenAPIObject } from '../schema'
import { createOpenAPIModel } from './types/createOpenAPIModel'
import { resolveUriTarget } from '../uri/resolveUriTarget'
import { createContext, createConfig } from './defaults'
import { OpenAPIReadConfig } from './OpenAPIReadConfig'
import { OpenAPIReadModel } from './OpenAPIReadModel'

export const openAPIReader = (config?: Partial<OpenAPIReadConfig>) => async (): Promise<OpenAPIReadModel> => {
  const context = createContext({ config: createConfig(config) })
  const uri = context.config.uri.sanitize(context.config.root)
  const data = await resolveUriTarget<OpenAPIObject>(uri)
  const input: Input<OpenAPIObject> = { uri, data }

  createOpenAPIModel(input, context)

  return context.model
}
