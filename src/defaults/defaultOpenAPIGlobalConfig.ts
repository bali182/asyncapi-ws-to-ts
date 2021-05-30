import { OpenAPIGlobalConfig } from '../openapi/types/OpenAPIGlobalConfig'
import { defaultURIManipulator } from './defaultUriManipulator'

export function defaultOpenAPIGlobalConfig(config: Partial<OpenAPIGlobalConfig> = {}): OpenAPIGlobalConfig {
  return {
    uri: defaultURIManipulator(config?.uri),
  }
}
