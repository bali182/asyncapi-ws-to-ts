import { defaultOpenAPIWriteConfig } from '../defaults/defaultOpenAPIWriteConfig'
import { OpenAPIGeneratorOutput } from '../types/OpenAPIGeneratorOutput'
import { OpenAPIGlobalConfig } from '../types/OpenAPIGlobalConfig'
import { OpenAPIWriteConfig } from '../types/OpenAPIWriteConfig'
import { TypeScriptUnit } from '../types/TypeScriptUnit'

export const openAPIWriter =
  (config: Partial<OpenAPIWriteConfig> = {}) =>
  (globalConfig: Partial<OpenAPIGlobalConfig> = {}) =>
  async (data: OpenAPIGeneratorOutput): Promise<void> => {
    const { stringify, write } = defaultOpenAPIWriteConfig(config)
    const { units } = data
    const stringifiedData = await Promise.all(
      units.map((unit) => stringify(unit).then((result): [TypeScriptUnit, string] => [unit, result])),
    )
    await Promise.all(stringifiedData.map(([{ path }, content]) => write(path, content)))
  }
