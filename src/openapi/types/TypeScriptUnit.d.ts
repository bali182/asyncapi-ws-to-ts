import { ImportDeclaration, Statement } from '@babel/types'

export type TypeScriptUnit = {
  path: string
  imports: ImportDeclaration[]
  content: Statement[]
}
