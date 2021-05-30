export type ContentReader<C, R> = (configuration: C) => () => Promise<R>
export type Generator<C, R, G> = (configuration: C) => (data: R) => Promise<G>
export type Writer<C, G, W> = (configuration: C) => (data: G) => Promise<W>
