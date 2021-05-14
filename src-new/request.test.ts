import { request } from './request'

describe(request.name, () => {
  it('should perform basic HTTPS get request', async () => {
    const { statusCode, data } = await request({ url: 'https://jsonplaceholder.typicode.com/users' })
    expect(statusCode).toBe(200)
    expect(JSON.parse(data)).toHaveLength(10)
  })
  it('should perform basic HTTP get request', async () => {
    const { statusCode, data } = await request({ url: 'http://jsonplaceholder.typicode.com/posts' })
    expect(statusCode).toBe(200)
    expect(JSON.parse(data)).toHaveLength(100)
  })
})
