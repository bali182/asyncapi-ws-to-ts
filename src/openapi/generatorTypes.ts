import { ImportDeclaration, Node } from 'typescript'
import { OpenAPIReadModel } from './readTypes'

export type TsUnit = {
  path: string
  imports: ImportDeclaration[]
  content: Node[]
}

export type TsGeneratorOutput = TsUnit[]

export type OpenAPIGenerator = Generator<OpenAPIReadModel, TsGeneratorOutput>
