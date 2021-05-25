import { SourceFile } from 'typescript'

export type ContentReader<R> = () => Promise<R>
export type Generator<R, G> = (data: R) => Promise<G>
export type Writer<G, W> = (data: G) => Promise<W>

export type CompilationUnit<T> = {
  path: string
  content: T
}

export type TsCompilationUnit = CompilationUnit<SourceFile>
