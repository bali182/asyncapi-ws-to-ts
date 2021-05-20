import { pathToFileURL } from 'url'
import { resolve } from 'path'
import { isUri } from 'valid-url'
import URI from 'urijs'

const AcceptedSchemes = ['http', 'https', 'file']

/**
 * Call when a path is directly received from the user, and unsure what it is.
 * @param path The unsanitized path.
 * @returns A sanitized proper URI.
 */
export function sanitizeUri(path: string): string {
  // If valid URI (file or http), return as is
  if (isUri(path)) {
    const uri = new URI(path)
    if (AcceptedSchemes.indexOf(uri.scheme()) < 0) {
      throw new TypeError(
        `Unexpected URI scheme: "${uri.scheme()}" in "${path}", expected one of ${AcceptedSchemes.join(', ')}.`,
      )
    }
    return path
  }

  // If not a valid URI, we assume it's a file path
  return pathToFileURL(resolve(path)).toString()
}
