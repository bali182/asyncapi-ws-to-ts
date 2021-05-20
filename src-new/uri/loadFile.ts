import { readFile } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { isNil } from '../utils'

export async function loadFile(uri: string): Promise<string> {
  const path = resolve(fileURLToPath(uri))
  return new Promise((resolve, reject) =>
    readFile(path, { encoding: 'utf-8' }, (error, data) => (!isNil(error) ? reject(error) : resolve(data))),
  )
}
