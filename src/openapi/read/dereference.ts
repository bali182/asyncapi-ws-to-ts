import { OpenAPIObject } from 'openapi3-ts'
import { isNil } from '../../utils'
import { URIManipulator } from '../types/URIManipulator'
import { findByFragments } from './findByFragments'

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
