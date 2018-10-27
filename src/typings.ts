import { SchemaObject, ReferenceObject } from './OpenApiTypings'

export interface IGenerator<Input> {
  generate(input: Input): string
}

export type SchemaOrRef = SchemaObject | ReferenceObject
