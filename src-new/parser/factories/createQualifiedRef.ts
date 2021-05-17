import { ReferenceObject } from '../../schema'
import { isNil } from '../../utils'
import { FactoryContext } from './FactoryContext'

export function createQualifiedRef(data: ReferenceObject, context: FactoryContext<any>): string {
  const { pathAccessor: a } = context
  // Check if it has the document in the URI, meaning it referrs to a different document
  const ownDocument = a.document(data.$ref)
  // If not take the current document and add the segments to it
  if (isNil(ownDocument)) {
    return a.create(a.document(context.uri), a.segments(data.$ref))
  }
  // Otherwise we have the whole URI
  return data.$ref
}
