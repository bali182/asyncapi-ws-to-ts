import { ExampleObject, ReferenceObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveExamples(
  input: ReadInput<Record<string, ExampleObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
