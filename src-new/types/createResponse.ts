import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ReferenceObject, ResponseObject } from '../schema'
import { isRefType } from '../utils'
import { noRef, ref } from './ref'
import { Ref, ResponseType } from './types'

export function createResponse(
  input: FactoryInput<ResponseObject | ReferenceObject>,
  context: FactoryContext,
): Ref<ResponseType> {
  const { data, uri } = input
  const { config } = context
  if (isRefType(data)) {
    return ref(config.uri.resolve(data.$ref, uri), context.model.responses)
  }
  return noRef
}
