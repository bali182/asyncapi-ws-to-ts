import { ReferenceObject, SchemaObject } from 'openapi3-ts'

export type SchemaTypesGeneratorConfig = {
  path(name: string, schema: SchemaObject): string
}

export type OpenAPIUtils = {
  dereferenceUri<T>(uri: string): T
  dereference<T>(input: T | ReferenceObject): T
  nameOf(input: any): string
}
