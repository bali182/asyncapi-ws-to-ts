import { ReferenceObject, ResponseObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveResponses(
  input: ReadInput<Record<string, ResponseObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
