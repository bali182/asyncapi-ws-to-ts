import { SchemaObject } from './schema'
import { sanitizeUri } from './uri/sanitizeUri'

type UriTransformer = (uri: string, parentUri?: string) => string
type SchemaLoader<T> = (uri: string) => Promise<T>
type SchemaTransformConfig = {}
type SchemaTransformer<S, T> = (schema: S) => Promise<T>

export class GeneratorHarness<S, T> {
  private _source: string
  private _uriTransformer: UriTransformer
  private _schemaLoader: SchemaLoader<S>
  private _schemaTransformer: SchemaTransformer<S, T>

  public source(uriOrPath: string): this {
    this._source = sanitizeUri(uriOrPath)
    return this
  }

  public transformUri(transformer: UriTransformer): this {
    this._uriTransformer = transformer
    return this
  }

  public loadSchemas(loader: SchemaLoader<S>): this {
    this._schemaLoader = loader
    return this
  }

  public transformSchemas(transformer: SchemaTransformer<S, T>): this {
    this._schemaTransformer = transformer
    return this
  }

  public async generate(): Promise<void> {}
}

new GeneratorHarness()
  .source('./test.json')
  .transformUri((ref) => ref)
  .loadSchemas((): Promise<SchemaObject> => null)
  .generate()
