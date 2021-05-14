import URI from 'urijs'
import { isNil, dropHead } from './utils'

export class FragmentURI extends URI {
  fragments(): string[] {
    const fragment = this.fragment()
    if (isNil(fragment)) {
      return []
    } else {
      return dropHead(fragment.split('/'))
    }
  }

  setFragments(fragments: string[]): URI {
    return this.fragment(`/${fragments.join('/')}`)
  }

  addFragment(...fragment: string[]): URI {
    const fragments = this.fragments().concat(fragment)
    return this.setFragments(fragments)
  }
}

export type PathAccessor = {
  segments(path: string): string[]
  document(path: string): string

  create(document: string, segments: string[]): string
  setSegments(path: string, segments: string[]): string
  append(path: string, ...segments: string[]): string
  pop(path: string): string
}

export class URIPathAccessor implements PathAccessor {
  create(document: string, path: string[]): string {
    const uri = isNil(document) ? new URI() : new URI(document)
    return this.setSegments(uri.valueOf(), path)
  }
  segments(path: string): string[] {
    const fragment = new URI(path).fragment()
    if (isNil(fragment)) {
      return []
    }
    if (fragment[0] !== '/') {
      throw new TypeError(`Malformed URI: ${path}.`)
    }
    return dropHead(fragment.split('/'))
  }
  setSegments(path: string, segments: string[]): string {
    const fragment = segments.length > 0 ? `/${segments.join('/')}` : null
    return new URI(path).fragment(fragment).valueOf()
  }
  document(path: string): string {
    const withoutFragment = new URI(path).fragment(null).valueOf()
    return withoutFragment?.length === 0 ? null : withoutFragment
  }
  append(path: string, ...segments: string[]): string {
    return this.setSegments(path, this.segments(path).concat(segments))
  }
  pop(path: string): string {
    const segments = this.segments(path)
    const newSegments = segments.length > 0 ? segments.slice(0, -1) : segments
    return this.setSegments(path, newSegments)
  }
}
