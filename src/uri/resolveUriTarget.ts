import URI from 'urijs'
import YAML from 'yamljs'
import { loadFile } from './loadFile'
import { request } from './request'

async function getAsString(uri: string): Promise<any> {
  const _uri = new URI(uri)
  if (_uri.scheme() === 'http' || _uri.scheme() === 'https') {
    const { data } = await request({ url: uri })
    return data
  } else if (_uri.scheme() === 'file') {
    return loadFile(uri)
  }
  throw new TypeError(`Unexpeced URI scheme: ${_uri.scheme()} in ${uri}`)
}

export async function resolveUriTarget<T>(uri: string): Promise<T> {
  const data = await getAsString(uri)
  try {
    return JSON.parse(data)
  } catch (e) {
    try {
      return YAML.parse(data)
    } catch (e) {
      throw new TypeError(`Unexpected content at ${uri}. Expected JSON or YAML content, got: \n${data}`)
    }
  }
  return null
}
