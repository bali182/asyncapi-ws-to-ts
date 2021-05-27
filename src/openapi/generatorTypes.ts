import { ImportDeclaration, Node } from 'typescript'
import { OpenAPIReadModel } from './readTypes'
import { OpenAPIModelType } from './types/types'

export type TsUnit = {
  path: string
  imports: ImportDeclaration[]
  content: Node[]
}

export type TsGeneratorOutput = TsUnit[]

export type OpenAPIGenerator = Generator<OpenAPIReadModel, TsGeneratorOutput>

export type OpenAPIGeneratorConfig = {
  name(input: OpenAPIModelType): string
  path(input: OpenAPIModelType, name: (input: OpenAPIModelType) => string): string
}

export type OpenAPIGeneratorContext = {
  config: OpenAPIGeneratorConfig
  model: OpenAPIReadModel
}
