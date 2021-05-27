import { join, resolve } from 'path'
import { OpenAPIModelType } from '../types/types'

export function noPathProvider(): never {
  throw new Error(`No path provider!`)
}

export const singleFile = (path: string) => () => resolve(path)

export const byName =
  (path: string, extension: 'ts' | 'tsx' = 'ts') =>
  (data: OpenAPIModelType, name: (data: OpenAPIModelType) => string): string =>
    join(path, `${name(data)}.${extension}`)
