import { OpenAPIObject } from 'openapi3-ts'
import { Issue } from '../../validation/typings'
import { URIManipulator } from '../types/URIManipulator'

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
