import { TypeScriptUnit } from './types/TypeScriptUnit'

export type TsWriterConfig = {
  stringify(input: TypeScriptUnit): Promise<string>
  write(path: string, data: string): Promise<void>
}
