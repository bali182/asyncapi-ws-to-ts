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

function tryParse<T>(content: string, isYaml: boolean): T {
  const firstParser = isYaml ? YAML.parse : JSON.parse
  const secondParser = isYaml ? JSON.parse : YAML.parse
  try {
    return firstParser(content)
  } catch {
    return secondParser(content)
  }
}

export async function resolveUriTarget<T>(uri: string, format: 'json' | 'yaml' = null): Promise<T> {
  const _uri = new URI(uri)
  if (_uri.scheme() === 'http' || _uri.scheme() === 'https') {
    const { data, headers } = await request({ url: uri })
    const isYaml = format === 'yaml' || YAMLContentTypes.indexOf(headers['content-type']) >= 0
    return tryParse(data, isYaml)
  } else if (_uri.scheme() === 'file') {
    const data = await loadFile(uri)
    const isYaml = format === 'yaml' || YAMLExtensions.indexOf(extname(fileURLToPath(uri))) >= 0
    return tryParse(data, isYaml)
  }
  throw new TypeError(`Unexpeced URI scheme: ${_uri.scheme()} in ${uri}`)
}
