import { TsUnit } from './generatorTypes'

export type TsWriterConfig = {
  stringify(input: TsUnit): Promise<string>
  write(path: string, data: string): Promise<void>
}
