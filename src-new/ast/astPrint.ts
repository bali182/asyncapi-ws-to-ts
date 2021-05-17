import { createPrinter, factory as f, NewLineKind, Node, NodeFlags, Statement, SyntaxKind } from 'typescript'

export function astToString(...nodes: Statement[]): string {
  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
    removeComments: false,
    omitTrailingSemicolon: false,
  })
  const sourceFile = f.createSourceFile(nodes, f.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None)
  return printer.printFile(sourceFile)
}
