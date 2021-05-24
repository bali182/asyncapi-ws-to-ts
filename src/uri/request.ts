import http, { RequestOptions, OutgoingHttpHeaders, IncomingHttpHeaders } from 'http'
import https from 'https'
import { URL } from 'url'

enum HttpMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

type HttpResponse = {
  statusCode: number
  data: string
  headers: IncomingHttpHeaders
}

type HttpRequest = {
  url: string
  method?: HttpMethod
  data?: any
  headers?: OutgoingHttpHeaders
}

export async function request({
  url,
  method = HttpMethod.GET,
  data = null,
  headers = {},
}: HttpRequest): Promise<HttpResponse> {
  const { protocol, host, port = protocol === 'https:' ? 443 : 80, pathname: path = '/' } = new URL(url)
  const lib = protocol == 'https:' ? https : http
  const options: RequestOptions = {
    method,
    host,
    port,
    path,
    headers,
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

    if (data) {
      request.write(data)
    }

    request.end()
  })
}
