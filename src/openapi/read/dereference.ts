import { OpenAPIObject } from 'openapi3-ts'
import { isNil } from '../../utils'
import { findByFragments } from './findByFragments'
import { URIManipulator } from './types'

export const dereference =
  (specs: Map<string, OpenAPIObject>, uri: URIManipulator) =>
  <T>(ref: string): T => {
    const documentUri = uri.document(ref)
    const spec = specs.get(documentUri)
    if (isNil(spec)) {
      throw new TypeError(`Unexpected document uri ${documentUri}.`)
    }
    return findByFragments<T>(spec, uri.fragments(ref))
  }
