import { OpenAPIObject } from 'openapi3-ts'

type OpenAPIDocumentFormat = 'json' | 'yaml'

export type OpenAPIReadConfig = {
  path: string
  format?: OpenAPIDocumentFormat
  resolve?: (uri: string, format?: OpenAPIDocumentFormat) => Promise<OpenAPIObject>
}
