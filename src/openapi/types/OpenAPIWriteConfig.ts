import { TypeScriptUnit } from './TypeScriptUnit'

export type OpenAPIWriteConfig = {
  stringify(unit: TypeScriptUnit): Promise<string>
  write(path: string, content: string): Promise<void>
}
