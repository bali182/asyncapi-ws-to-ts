import { SchemaObject } from 'openapi3-ts'
import { GeneratorContext } from '../types'

export type SchemaTypesGeneratorConfig = {
  path(name: string, schema: SchemaObject): string
}

export type SchemaContext = GeneratorContext & SchemaTypesGeneratorConfig 
