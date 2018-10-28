import { SchemaObject, ReferenceObject } from './AyncApiTypings'

export interface IGenerator<Input> {
  generate(input: Input): string
}

export type SchemaOrRef = SchemaObject | ReferenceObject
