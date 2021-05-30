import { Issue } from '../../validation/typings'
import { TypeScriptUnit } from './TypeScriptUnit'

export type OpenAPIGeneratorOutput = {
  units: TypeScriptUnit[]
  issues: Issue[]
}
