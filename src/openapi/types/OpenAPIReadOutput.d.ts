import { OpenAPIObject } from 'openapi3-ts'
import { Issue } from '../../validation/typings'

export type OpenAPIReadOutput = {
  documentUri: string
  document: OpenAPIObject
  documents: Map<string, OpenAPIObject>
  issues: Issue[]
}
