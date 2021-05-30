import { ImportDeclaration, Statement } from 'typescript'

export type TypeScriptUnit = {
  path: string
  imports: ImportDeclaration[]
  content: Statement[]
}
