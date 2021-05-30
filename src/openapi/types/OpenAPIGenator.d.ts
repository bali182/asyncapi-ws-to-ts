import { Generator } from '../../typings'
import { OpenAPIGeneratorOutput } from './OpenAPIGeneratorOutput'
import { OpenAPIGlobalConfig } from './OpenAPIGlobalConfig'
import { OpenAPIReadOutput } from './OpenAPIReadOutput'

export type OpenAPIGenerator = Generator<OpenAPIGlobalConfig, OpenAPIReadOutput, OpenAPIGeneratorOutput>
