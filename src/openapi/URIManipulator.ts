export type URIManipulator = {
  append(path: string, ...segments: string[]): string
  resolve(ref: string, parent: string): string
  sanitize(path: string): string
}
