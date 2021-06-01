import { Generator } from '../../typings'
import { GeneratorContext } from '../generators/types'
import { OpenAPIGeneratorOutput } from './OpenAPIGeneratorOutput'
import { OpenAPIGlobalConfig } from './OpenAPIGlobalConfig'
import { OpenAPIReadOutput } from './OpenAPIReadOutput'

export type OpenAPIGenerator = (context: GeneratorContext) => Promise<OpenAPIGeneratorOutput>

export type OpenAPIMainGenerator = Generator<OpenAPIGlobalConfig, OpenAPIReadOutput, OpenAPIGeneratorOutput>
