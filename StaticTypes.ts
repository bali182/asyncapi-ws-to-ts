export type __HttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH' | 'TRACE'
export type __HttpHeaders = { [key: string]: string }
export type __HttpBody = string | null
export type __HttpRequest = {
  url: string
  method: __HttpMethod
  body?: __HttpBody
  headers: __HttpHeaders
}
export type __HttpResponse = {
  status: number
  header: __HttpHeaders
  body?: __HttpBody
}
export type __HttpAdapter = {
  execute(request: __HttpRequest): Promise<__HttpResponse>
}
