import { OpenAPIObject } from 'openapi3-ts'

export type OpenAPIReadConfig = {
  path: string
  resolve?: (uri: string) => Promise<OpenAPIObject>
}
