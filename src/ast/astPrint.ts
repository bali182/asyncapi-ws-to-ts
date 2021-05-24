import { createPrinter, NewLineKind, Node, factory as f, SyntaxKind, NodeFlags, Statement } from 'typescript'

export function astToString(...nodes: Node[]): string {
  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
    removeComments: false,
    omitTrailingSemicolon: true,
  })
  const sf = f.createSourceFile(nodes as Statement[], f.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None)
  return printer.printFile(sf)
}
