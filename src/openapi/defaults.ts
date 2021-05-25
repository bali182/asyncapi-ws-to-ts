import { append, sanitize, resolve } from '../uri/defaultFns'
import { isNil } from '../utils'
import { OpenAPIReadConfig } from './OpenAPIReadConfig'
import { OpenAPIReadContext } from './OpenAPIReadContext'
import { OpenAPIReadModel } from './OpenAPIReadModel'
import { URIManipulator } from './URIManipulator'

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
