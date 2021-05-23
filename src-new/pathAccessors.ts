import URI from 'urijs'
import { dropHead, isEmpty } from './utils'

export type PathAccessor = {
  segments(path: string): string[]
  append(path: string, ...segments: string[]): string
}

export class URIPathAccessor implements PathAccessor {
  private setSegments(path: string, segments: string[]): string {
    const fragment = segments.length > 0 ? `/${segments.join('/')}` : null
    return new URI(path).fragment(fragment).valueOf()
  }

  segments(path: string): string[] {
    const fragment = new URI(path).fragment()
    if (isEmpty(fragment)) {
      return []
    }
    if (fragment[0] !== '/') {
      throw new TypeError(`Malformed URI: ${path}.`)
    }
    return dropHead(fragment.split('/'))
  }

  append(path: string, ...segments: string[]): string {
    return this.setSegments(path, this.segments(path).concat(segments))
  }
}
