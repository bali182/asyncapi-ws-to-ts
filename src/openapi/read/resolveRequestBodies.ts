import { ReferenceObject, RequestBodyObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveRequestBodies(
  input: ReadInput<Record<string, RequestBodyObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
