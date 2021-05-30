import { OpenAPIObject } from 'openapi3-ts'
import { Issue } from '../../validation/typings'

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
  resolve(uri: string): Promise<OpenAPIObject>
}

export type ReadInput<T> = {
  data: T
  uri: string
}
