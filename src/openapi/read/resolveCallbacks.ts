import { CallbackObject, ReferenceObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveCallbacks(
  input: ReadInput<Record<string, CallbackObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
