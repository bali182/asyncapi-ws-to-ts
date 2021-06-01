import { ReferenceObject, SchemaObject } from 'openapi3-ts'
import { Issue } from '../../validation/typings'
import { OpenAPIReadOutput } from '../types/OpenAPIReadOutput'
import { URIManipulator } from '../types/URIManipulator'

export type OpenAPIUtils = {
  dereferenceUri<T>(uri: string): T
  dereference<T>(input: T | ReferenceObject): T
  nameOf(input: any): string
  uriOf(input: any): string
}

export type GeneratorContext = OpenAPIReadOutput & {
  utils: OpenAPIUtils
  uri: URIManipulator
  issues: Issue[]
}

export type GeneratorInput<T> = {
  data: T
  uri: string
}
