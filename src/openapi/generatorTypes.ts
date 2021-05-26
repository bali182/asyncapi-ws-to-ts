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
  nameProvider(input: OpenAPIModelType): string
  pathProvider(input: OpenAPIReadModel): string
}

export type OpenAPIGeneratorContext = {
  config: OpenAPIGeneratorConfig
  model: OpenAPIReadModel
}
