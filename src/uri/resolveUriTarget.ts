import { extname } from 'path'
import URI from 'urijs'
import { fileURLToPath } from 'url'
import YAML from 'yamljs'
import { loadFile } from './loadFile'
import { request } from './request'

const YAMLContentTypes = [
  'text/x-yaml',
  'text/yaml',
  'text/yml',
  'application/x-yaml',
  'application/x-yml',
  'application/yaml',
  'application/yml',
]

const YAMLExtensions = ['.yaml', '.yml']

export async function resolveUriTarget<T>(uri: string): Promise<T> {
  const _uri = new URI(uri)
  if (_uri.scheme() === 'http' || _uri.scheme() === 'https') {
    const { data, headers } = await request({ url: uri })
    return YAMLContentTypes.indexOf(headers['content-type']) >= 0 ? YAML.parse(data) : JSON.parse(data)
  } else if (_uri.scheme() === 'file') {
    const data = await loadFile(uri)
    return YAMLExtensions.indexOf(extname(fileURLToPath(uri))) >= 0 ? YAML.parse(data) : JSON.parse(data)
  }
  throw new TypeError(`Unexpeced URI scheme: ${_uri.scheme()} in ${uri}`)
}
