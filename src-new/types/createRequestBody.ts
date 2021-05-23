import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ReferenceObject, RequestBodyObject } from '../schema'
import { noRef } from './ref'
import { Ref, ResponseType } from './types'

export function createRequestBody(
  input: FactoryInput<RequestBodyObject | ReferenceObject>,
  context: FactoryContext,
): Ref<ResponseType> {
  return noRef
}
