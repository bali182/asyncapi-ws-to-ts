import URI, { encode, decode } from 'urijs'
import p from 'path'
import { pathToFileURL } from 'url'
import { isUri } from 'valid-url'
import { dropHead, isEmpty } from '../utils'
import { URIManipulator } from '../openapi/types/URIManipulator'
import { isNil } from '../utils'

const AcceptedSchemes = ['http', 'https', 'file']

function setFragments(uri: string, fragments: string[]): string {
  const fragment = fragments.length > 0 ? `/${fragments.map(encode).join('/')}` : null
  return new URI(uri).fragment(fragment).valueOf()
}

export function fragments(uri: string): string[] {
  const fragment = new URI(uri).fragment()
  if (isEmpty(fragment)) {
    return []
  }
  if (fragment[0] !== '/') {
    throw new TypeError(`Malformed URI: ${uri}.`)
  }
  return dropHead(fragment.split('/')).map(decode)
}

export function append(uri: string, ...pieces: string[]): string {
  return setFragments(uri, fragments(uri).concat(pieces))
}

export function resolve(ref: string, parent: string): string {
  const parentUri = new URI(parent)
  const uri = new URI(ref)
  if (!isEmpty(uri.hostname()) && !isEmpty(uri.protocol())) {
    return uri.valueOf()
  }
  return uri.absoluteTo(parentUri).valueOf()
}

export function sanitize(path: string): string {
  if (isUri(path)) {
    const uri = new URI(path)
    if (AcceptedSchemes.indexOf(uri.scheme()) < 0) {
      throw new TypeError(
        `Unexpected URI scheme: "${uri.scheme()}" in "${path}", expected one of ${AcceptedSchemes.join(', ')}.`,
      )
    }
    return path
  }
  return pathToFileURL(p.resolve(path)).toString()
}

export function document(path: string): string {
  return new URI(path).fragment('').hash('').valueOf()
}

export function defaultURIManipulator(config: Partial<URIManipulator> = {}): URIManipulator {
  const { append: _append, document: _document, fragments: _fragments, resolve: _resolve, sanitize: _sanitize } = config
  return {
    append: isNil(_append) ? append : _append,
    resolve: isNil(_resolve) ? resolve : _resolve,
    sanitize: isNil(_sanitize) ? sanitize : _sanitize,
    document: isNil(_document) ? document : _document,
    fragments: isNil(_fragments) ? fragments : _fragments,
  }
}
