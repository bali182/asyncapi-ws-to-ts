import { resolve } from 'path'
import { OpenAPIGeneratorContext, TsUnit } from '../../generatorTypes'
import { Type } from '../../types/types'
import { generateTypeAst } from './astCreators'

export function generateType(type: Type, context: OpenAPIGeneratorContext): TsUnit {
  return {
    content: [generateTypeAst(context.config.nameProvider(type), type)],
    imports: [],
    path: resolve('trash/generated-types.ts'),
  }
}
