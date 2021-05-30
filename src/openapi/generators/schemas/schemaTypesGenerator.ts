import { entries } from '../../../utils'
import { OpenAPIGeneratorOutput } from '../../types/OpenAPIGeneratorOutput'
import { OpenAPIGlobalConfig } from '../../types/OpenAPIGlobalConfig'
import { OpenAPIReadOutput } from '../../types/OpenAPIReadOutput'
import { SchemaTypesGeneratorConfig } from '../types'

export const schemaTypesGenerator =
  (config: SchemaTypesGeneratorConfig) =>
  (globalConfig: OpenAPIGlobalConfig) =>
  async (data: OpenAPIReadOutput): Promise<OpenAPIGeneratorOutput> => {
    const { document, documents } = data
    entries(document?.components?.schemas || {}).map(([key, schemaOrRef]) => {
      
    })
    return { issues: [], units: [] }
  }
