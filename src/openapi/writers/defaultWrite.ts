import { writeFile } from 'fs'

export function defaultWrite(path: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(path, content, { encoding: 'utf-8' }, (error) => {
      if (error) {
        return reject(error)
      }
      resolve()
    })
  })
}
