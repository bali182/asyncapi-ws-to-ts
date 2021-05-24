import { createContext, OpenAPIModel, Input, OpenAPIConfig } from './FactoryContext'
import { OpenAPIObject } from './schema'
import { createOpenAPIModel } from './types/createOpenAPIModel'
import { resolveUriTarget } from './uri/resolveUriTarget'

export async function readSchema(path: string, config?: OpenAPIConfig): Promise<OpenAPIModel> {
  const context = createContext({ config })

  const uri = context.config.uri.sanitize(path)
  const data = await resolveUriTarget<OpenAPIObject>(uri)

  const input: Input<OpenAPIObject> = { uri, data }

  return createOpenAPIModel(input, context)
}
