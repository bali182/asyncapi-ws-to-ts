import { OpenAPIObject } from 'openapi3-ts'
import { append, document, resolve, sanitize, fragments } from '../../uri/defaultFns'
import { resolveUriTarget } from '../../uri/resolveUriTarget'
import { isNil } from '../../utils'
import { Issue } from '../../validation/typings'

export type OpenAPIReadConfig = {
  path: string
  format?: 'json' | 'yaml'
  uri: URIManipulator
  resolve: (uri: string, format?: 'json' | 'yaml') => Promise<OpenAPIObject>
}

export type OpenAPIReadResult = {
  spec: OpenAPIObject
  references: Map<string, OpenAPIObject>
  issues: Issue[]
}

export type URIManipulator = {
  append(path: string, ...segments: string[]): string
  resolve(ref: string, parent: string): string
  sanitize(path: string): string
  document(path: string): string
  fragments(uri: string): string[]
}

export type ReadContext = {
  specs: Map<string, OpenAPIObject>
  issues: Issue[]
  uri: URIManipulator
  visited: Set<string>
  resolve(uri: string, format?: 'json' | 'yaml'): Promise<OpenAPIObject>
}

export type ReadInput<T> = {
  data: T
  uri: string
}

export function defaultURIManipulator(config: Partial<URIManipulator> = {}): URIManipulator {
  const { append: _append, document: _document, fragments: _fragments, resolve: _resolve, sanitize: _sanitize } = config
  return {
    append: isNil(_append) ? append : _append,
    resolve: isNil(_resolve) ? resolve : _resolve,
    sanitize: isNil(_sanitize) ? sanitize : _sanitize,
    document: isNil(_document) ? document : _document,
    fragments: isNil(_fragments) ? fragments : _fragments,
  }
}

export function defaultOpenAPIReadConfig(config: Partial<OpenAPIReadConfig> = {}): OpenAPIReadConfig {
  const { resolve, path, uri, format } = config

  return {
    resolve: isNil(resolve) ? resolveUriTarget : resolve,
    path: path,
    uri: defaultURIManipulator(uri),
    format: format,
  }
}
