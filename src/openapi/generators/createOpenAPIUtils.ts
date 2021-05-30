import { isReferenceObject, OpenAPIObject, ReferenceObject } from 'openapi3-ts'
import { entries, isNil } from '../../utils'
import { findByFragments } from '../findByFragments'
import { URIManipulator } from '../types/URIManipulator'
import { OpenAPIUtils } from './types'

type OpenAPIDocuments = Map<string, OpenAPIObject>

function getOwnerDocument(uri: URIManipulator, documents: OpenAPIDocuments, ref: string): OpenAPIObject {
  const documentUri = uri.document(ref)
  const document = documents.get(documentUri)
  if (isNil(document)) {
    throw new TypeError(`Unexpected document uri ${documentUri}.`)
  }
  return document
}

function addNameMappings<T>(docPart: Record<string, T>, mappings: Map<any, string>): void {
  for (const [name, item] of entries(docPart)) {
    mappings.set(item, name)
  }
}

function addNameMappingsForDocument(document: OpenAPIObject, mappings: Map<any, string>): void {
  const { headers, parameters, schemas } = document?.components || {}
  addNameMappings(headers || {}, mappings)
  addNameMappings(parameters || {}, mappings)
  addNameMappings(schemas || {}, mappings)
}

function createNameMappings(documents: OpenAPIDocuments): Map<any, string> {
  const mappings = new Map<any, string>()
  for (const document of Array.from(documents.values())) {
    addNameMappingsForDocument(document, mappings)
  }
  return mappings
}

export const dereferenceUri =
  (uri: URIManipulator, documents: OpenAPIDocuments) =>
  <T>(ref: string): T =>
    findByFragments<T>(getOwnerDocument(uri, documents, ref), uri.fragments(ref))

export const dereference =
  (uri: URIManipulator, documents: OpenAPIDocuments) =>
  <T>(input: T | ReferenceObject): T =>
    isReferenceObject(input)
      ? findByFragments<T>(getOwnerDocument(uri, documents, input.$ref), uri.fragments(input.$ref))
      : input

export const nameOf = (documents: OpenAPIDocuments) => {
  const mapping = createNameMappings(documents)
  return (input: any): string => mapping.get(input)
}

export function createOpenAPIUtils(uri: URIManipulator, documents: OpenAPIDocuments): OpenAPIUtils {
  return {
    dereference: dereference(uri, documents),
    dereferenceUri: dereferenceUri(uri, documents),
    nameOf: nameOf(documents),
  }
}
