import { ParameterObject, ReferenceObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'

export async function resolveParameters(
  input: ReadInput<Record<string, ParameterObject | ReferenceObject>>,
  context: ReadContext,
): Promise<void> {}
