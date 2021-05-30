import { ReferenceObject, SecuritySchemeObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveSecuritySchemes(
  input: ReadInput<Record<string, SecuritySchemeObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
