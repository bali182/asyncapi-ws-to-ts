import URI from 'urijs'
import { isEmpty, isNil } from '../../utils'

function createAbsoluteUri(_uri: string): string {
  const uri = new URI(_uri)
  // Absolute URI given, all good.
  if (!isEmpty(uri.hostname()) && !isEmpty(uri.protocol())) {
    return uri.valueOf()
  }
  
}

export function resolveUri(refUri: string, parentUri: string = null): string {
  // Parent is null, meaning uri should be absolute or turned into absolute.
  if (isNil(parentUri)) {
    return createAbsoluteUri(refUri)
  }

  const fromUri = new URI(parentUri)
  const uri = new URI(refUri)

  if (!isEmpty(uri.hostname()) && !isEmpty(uri.protocol())) {
    return refUri
  }
  if (isEmpty(uri.hostname()) && isEmpty(uri.protocol())) {
    return uri.absoluteTo(fromUri).valueOf()
  }
  return refUri
}
