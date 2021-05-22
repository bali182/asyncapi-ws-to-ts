import URI from 'urijs'
import { isEmpty } from '../../utils'
import { URITransform } from './FactoryContext'

export function resolveUri(refUri: string, parentUri: string = null, transform: URITransform): string {
  const fromUri = new URI(parentUri)
  const uri = new URI(transform(refUri))
  if (!isEmpty(uri.hostname()) && !isEmpty(uri.protocol())) {
    return uri.valueOf()
  }
  return uri.absoluteTo(fromUri).valueOf()
}
