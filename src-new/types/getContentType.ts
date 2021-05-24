import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ContentObject } from '../schema'
import { isNil, keys } from '../utils'

export function getContentType(input: FactoryInput<ContentObject>, context: FactoryContext): string {
  const { data, uri } = input
  // No response
  if (isNil(data)) {
    return null
  }
  const mediaTypes = keys(data)
  switch (mediaTypes.length) {
    // No media type meaning no response
    case 0:
      return null
    // 1 media type, we are in business
    case 1:
      return mediaTypes[0]
    // Any more media types, we can't handle that for now.
    default:
      throw new TypeError(`Expected single content type at ${uri}, got ${mediaTypes.join(', ')}.`)
  }
}
