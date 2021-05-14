import URI from 'urijs'
import { dropHead, isNil } from '../../utils'
import { PathItem } from '../../validation/typings'

export function refToPath(ref: string): PathItem[] {
  return dropHead(
    new URI(ref)
      .normalizeFragment()
      .fragment()
      .split('/'),
  )
}

export function pathToRef(path: PathItem[]): string {
  return `#/${path.join('/')}`
}

export function getByPathInternal<T = any>(input: any, path: PathItem[]): T {
  if (path.length === 0) {
    return input
  }
  const [head, ...rest] = path
  if (isNil(input)) {
  }
  const result = input[head]
  return getByPathInternal<T>(result, rest)
}
