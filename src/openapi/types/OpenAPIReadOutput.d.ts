import { OpenAPIObject } from 'openapi3-ts'
import { Issue } from '../../validation/typings'

export type OpenAPIReadOutput = {
  documentUri: string
  document: OpenAPIObject
  documents: Map<string, OpenAPIObject>
  uris: Map<any, string>
  issues: Issue[]
}
