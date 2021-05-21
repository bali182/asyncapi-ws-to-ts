import URI from 'urijs'
import { isEmpty } from '../../utils'

export function resolveUri(refUri: string, parentUri: string = null): string {
  const fromUri = new URI(parentUri)
  const uri = new URI(refUri)
  if (!isEmpty(uri.hostname()) && !isEmpty(uri.protocol())) {
    return refUri
  }
  return uri.absoluteTo(fromUri).valueOf()
}
