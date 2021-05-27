import { append, sanitize, resolve } from '../uri/defaultFns'
import { isNil } from '../utils'
import { defaultNameProvider } from './generators/defaultNameProvider'
import { noPathProvider } from './generators/pathProviders'
import { OpenAPIGeneratorConfig } from './generatorTypes'
import { OpenAPIReadConfig, OpenAPIReadContext, OpenAPIReadModel, URIManipulator } from './readTypes'
import { defaultStringify } from './writers/defaultStringify'
import { defaultWrite } from './writers/defaultWrite'
import { TsWriterConfig } from './writerTypes'

export function createURIManipulator(base: Partial<URIManipulator> = {}): URIManipulator {
  const { append: _append, resolve: _resolve, sanitize: _sanitize } = base
  return {
    append: isNil(_append) ? append : _append,
    resolve: isNil(_resolve) ? resolve : _resolve,
    sanitize: isNil(_sanitize) ? sanitize : _sanitize,
  }
}

export function createConfig(base: Partial<OpenAPIReadConfig> = {}): OpenAPIReadConfig {
  return {
    root: base.root,
    uri: createURIManipulator(base.uri),
  }
}

export function createModel(base: Partial<OpenAPIReadModel> = {}): OpenAPIReadModel {
  const { operations, responses, requestBodies, parameters, types } = base
  return {
    operations: isNil(operations) ? new Map() : operations,
    responses: isNil(responses) ? new Map() : responses,
    requestBodies: isNil(requestBodies) ? new Map() : requestBodies,
    parameters: isNil(parameters) ? new Map() : parameters,
    types: isNil(types) ? new Map() : types,
  }
}

export function createContext(base: Partial<OpenAPIReadContext> = {}): OpenAPIReadContext {
  return {
    config: createConfig(base.config),
    model: createModel(base.model),
    issues: isNil(base.issues) ? [] : base.issues,
  }
}

export function crateGeneratorConfig(base: Partial<OpenAPIGeneratorConfig> = {}): OpenAPIGeneratorConfig {
  return {
    name: base?.name || defaultNameProvider,
    path: base?.path || noPathProvider,
  }
}

export function createWriterConfig(base: Partial<TsWriterConfig> = {}): TsWriterConfig {
  return {
    stringify: base?.stringify || defaultStringify,
    write: base?.write || defaultWrite,
  }
}
