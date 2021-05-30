import { PathsObject } from 'openapi3-ts'
import { ReadContext, ReadInput } from './types'
import { validate } from './validate'
import { pathsObject } from './validators/pathsObject'

export async function resolvePaths(input: ReadInput<PathsObject>, context: ReadContext): Promise<void> {
  if (!validate(input, context, pathsObject)) {
    return
  }
}
