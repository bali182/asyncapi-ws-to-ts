import { OpenAPIWriteConfig } from '../types/OpenAPIWriteConfig'
import { promises } from 'fs'
import { dirname, resolve } from 'path'
import { isNil } from '../../utils'

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

async function exists(dir: string): Promise<boolean> {
  try {
    const stats = await promises.lstat(dir)
    return stats.isDirectory()
  } catch (e) {
    return false
  }
}

export async function defaultWrite(path: string, content: string): Promise<void> {
  const _path = resolve(path)
  const dir = dirname(_path)
  const dirExists = await exists(dir)
  if (!dirExists) {
    await promises.mkdir(dir, { recursive: true })
  }
  await promises.writeFile(_path, content, { encoding: 'utf-8' })
}

export function defaultOpenAPIWriteConfig(config: Partial<OpenAPIWriteConfig> = {}): OpenAPIWriteConfig {
  const { write, stringify } = config
  return {
    write: isNil(write) ? defaultWrite : write,
    stringify: isNil(stringify) ? defaultStringify : stringify,
  }
}
