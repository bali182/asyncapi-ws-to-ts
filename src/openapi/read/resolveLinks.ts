import { LinkObject, ReferenceObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveLinks(
  input: ReadInput<Record<string, LinkObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
