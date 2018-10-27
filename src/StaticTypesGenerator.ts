import { IGenerator } from './typings'
import { readFileSync } from 'fs'
import { join } from 'path'

const content = readFileSync(join(__dirname, '../', 'StaticTypes.ts'), 'utf-8')

export class StaticTypesGenerator implements IGenerator<void> {
  generate() {
    return content.trim()
  }
}
