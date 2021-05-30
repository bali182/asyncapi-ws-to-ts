import { resolve } from 'path'

export function noPathProvider(): never {
  throw new Error(`No path provider!`)
}

export const singleFile = (path: string) => () => resolve(path)
