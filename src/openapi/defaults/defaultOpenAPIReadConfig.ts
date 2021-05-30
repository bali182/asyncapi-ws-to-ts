import { OpenAPIReadConfig } from '../types/OpenAPIReadConfig'
import { isNil } from '../../utils'
import { extname } from 'path'
import URI from 'urijs'
import YAML from 'yamljs'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import http, { RequestOptions, IncomingHttpHeaders } from 'http'
import https from 'https'
import { URL } from 'url'

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

export async function loadFile(uri: string): Promise<string> {
  const path = resolve(fileURLToPath(uri))
  return fs.readFile(path, { encoding: 'utf-8' })
}

type HttpResponse = {
  statusCode: number
  data: string
  headers: IncomingHttpHeaders
}

export async function request(url: string): Promise<HttpResponse> {
  const { protocol, host, port = protocol === 'https:' ? 443 : 80, pathname: path = '/' } = new URL(url)
  const lib = protocol == 'https:' ? https : http
  const options: RequestOptions = {
    method: 'GET',
    host,
    port,
    path,
  }
  return new Promise((resolve, reject) => {
    const request = lib.request(options, (response) => {
      const data = []
      response.headers
      response.on('data', (chunk: any) => data.push(chunk))
      response.on('end', () =>
        resolve({
          data: Buffer.concat(data).toString(),
          statusCode: response.statusCode,
          headers: { ...response.headers },
        }),
      )
    })

    request.on('error', reject)

    request.end()
  })
}

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
    const { data, headers } = await request(uri)
    const isYaml = format === 'yaml' || YAMLContentTypes.indexOf(headers['content-type']) >= 0
    return tryParse(data, isYaml)
  } else if (_uri.scheme() === 'file') {
    const data = await loadFile(uri)
    const isYaml = format === 'yaml' || YAMLExtensions.indexOf(extname(fileURLToPath(uri))) >= 0
    return tryParse(data, isYaml)
  }
  throw new TypeError(`Unexpeced URI scheme: ${_uri.scheme()} in ${uri}`)
}

export function defaultOpenAPIReadConfig(config: Partial<OpenAPIReadConfig> = {}): OpenAPIReadConfig {
  const { resolve, path, format } = config

  return {
    resolve: isNil(resolve) ? resolveUriTarget : resolve,
    path: path,
    format: format,
  }
}
