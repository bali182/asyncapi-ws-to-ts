import { SchemaObject, ReferenceObject } from './AyncApiTypings'

export const enum GeneratorTarget {
  CLIENT = 'client',
  SERVER = 'server',
}

export interface Options {
  file: string
  apiTypeName: string
  target: GeneratorTarget
}

export interface IGenerator<Input> {
  generate(input: Input): string
}

export type SchemaOrRef = SchemaObject | ReferenceObject
