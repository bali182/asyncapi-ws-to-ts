import prettier, { Options } from 'prettier'
import { OpenAPIWriteConfig } from '../types/OpenAPIWriteConfig'
import { promises } from 'fs'
import { dirname, resolve } from 'path'
import { isNil } from '../../utils'

import { TypeScriptUnit } from '../types/TypeScriptUnit'
import { program, Statement, file } from '@babel/types'
import generate from '@babel/generator'

export async function defaultStringify(data: TypeScriptUnit): Promise<string> {
  const content: Statement[] = (data.imports as Statement[]).concat(data.content)
  const ast = file(program(content, [], 'module'))
  return generate(ast, { compact: false }).code
}

export const prettierStringify =
  (options: Options = {}) =>
  async (data: TypeScriptUnit): Promise<string> => {
    return prettier.format(await defaultStringify(data), options)
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
