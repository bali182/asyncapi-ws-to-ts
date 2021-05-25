export type ContentReader<R> = () => Promise<R>
export type Generator<R, G> = (data: R) => Promise<G>
export type Writer<G, W> = (data: G) => Promise<W>
