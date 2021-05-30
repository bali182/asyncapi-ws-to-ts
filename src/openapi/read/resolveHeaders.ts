import { HeaderObject, ReferenceObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveHeaders(
  input: ReadInput<Record<string, HeaderObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
