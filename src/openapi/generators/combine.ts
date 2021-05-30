import { Issue } from '../../validation/typings'
import { OpenAPIGenerator } from '../types/OpenAPIGenator'
import { OpenAPIGeneratorOutput } from '../types/OpenAPIGeneratorOutput'
import { OpenAPIGlobalConfig } from '../types/OpenAPIGlobalConfig'
import { OpenAPIReadOutput } from '../types/OpenAPIReadOutput'
import { TypeScriptUnit } from '../types/TypeScriptUnit'
import { mergeUnits } from './mergeUnits'

export const combine =
  (...generators: OpenAPIGenerator[]): OpenAPIGenerator =>
  (config: OpenAPIGlobalConfig) =>
  async (data: OpenAPIReadOutput): Promise<OpenAPIGeneratorOutput> => {
    const allUnits: TypeScriptUnit[] = []
    const allIssues: Issue[] = []
    for (const generator of generators) {
      const { issues, units } = await generator(config)(data)
      allUnits.push(...units)
      allIssues.push(...issues)
    }
    return {
      issues: allIssues,
      units: mergeUnits(allUnits),
    }
  }
