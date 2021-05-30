import { ImportDeclaration, Node } from 'typescript'

export type TsUnit = {
  path: string
  imports: ImportDeclaration[]
  content: Node[]
}

export type TsGeneratorOutput = TsUnit[]
