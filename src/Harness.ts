import { ContentReader, Generator, Writer } from './typings'

export class Harness<C, R, G, W> {
  private readonly _configuration: C
  private _reader: ContentReader<C, R>
  private _generator: Generator<C, R, G>
  private _writer: Writer<C, G, W>

  constructor(config: C) {
    this._configuration = config
  }

  public read(reader: ContentReader<C, R>): this {
    this._reader = reader
    return this
  }
  public generate(generator: Generator<C, R, G>): this {
    this._generator = generator
    return this
  }
  public write(writer: Writer<C, G, W>): this {
    this._writer = writer
    return this
  }
  public async run(): Promise<W> {
    const { _configuration } = this
    const r = await this._reader(_configuration)()
    const g = await this._generator(_configuration)(r)
    const w = await this._writer(_configuration)(g)
    return w
  }
}

export function harness<C, R, G, W>(config: C = null): Harness<C, R, G, W> {
  return new Harness(config)
}
