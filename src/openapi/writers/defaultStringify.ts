import { createPrinter, NewLineKind, factory as f, SyntaxKind, NodeFlags, Statement, Node } from 'typescript'
import { TsUnit } from '../generatorTypes'

export async function defaultStringify(data: TsUnit): Promise<string> {
  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
    removeComments: false,
    omitTrailingSemicolon: true,
  })
  const eof = f.createToken(SyntaxKind.EndOfFileToken)
  const content = (data.imports as Node[]).concat(data.content) as Statement[]
  return printer.printFile(f.createSourceFile(content, eof, NodeFlags.None))
}
