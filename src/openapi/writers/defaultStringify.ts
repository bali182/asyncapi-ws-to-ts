import { createPrinter, NewLineKind, factory as f, SyntaxKind, NodeFlags, Statement, Node } from 'typescript'
import { TypeScriptUnit } from '../types/TypeScriptUnit'

export async function defaultStringify(data: TypeScriptUnit): Promise<string> {
  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
    removeComments: false,
    omitTrailingSemicolon: true,
  })
  const eof = f.createToken(SyntaxKind.EndOfFileToken)
  const content = (data.imports as Node[]).concat(data.content) as Statement[]
  return printer.printFile(f.createSourceFile(content, eof, NodeFlags.None))
}
