import { append, fragments, sanitize, resolve } from './uri/defaultFns'
import { OperationType, ParameterType, Type } from './types/types'
import { isNil } from './utils'
import { Issue } from './validation/typings'

export type URITransform = (uri: string) => string

export type FactoryInput<S> = {
  readonly uri: string
  readonly data: S
  readonly name?: string
}

export type FactoryContext = {
  readonly model: OpenAPIModel
  readonly issues: Issue[]
  readonly config: OpenAPIConfig
}

export type URIManipulator = {
  fragments(path: string): string[]
  append(path: string, ...segments: string[]): string
  resolve(ref: string, parent: string): string
  sanitize(path: string): string
}

export type OpenAPIModel = {
  readonly types: Map<string, Type>
  readonly operations: Map<string, OperationType>
  readonly parameters: Map<string, ParameterType>
  readonly responses: Map<string, any>
  readonly requestBodies: Map<string, any>
}

export type OpenAPIConfig = {
  readonly uri: URIManipulator
}

export function createURIManipulator(base: Partial<URIManipulator> = {}): URIManipulator {
  const { append: _append, fragments: _fragments, resolve: _resolve, sanitize: _sanitize } = base
  return {
    append: isNil(_append) ? append : _append,
    fragments: isNil(_fragments) ? fragments : _fragments,
    resolve: isNil(_resolve) ? resolve : _resolve,
    sanitize: isNil(_sanitize) ? sanitize : _sanitize,
  }
}

export function createConfig(base: Partial<OpenAPIConfig> = {}): OpenAPIConfig {
  return {
    uri: createURIManipulator(base.uri),
  }
}

export function createModel(base: Partial<OpenAPIModel> = {}): OpenAPIModel {
  const { operations, responses, requestBodies, parameters, types } = base
  return {
    operations: isNil(operations) ? new Map() : operations,
    responses: isNil(responses) ? new Map() : responses,
    requestBodies: isNil(requestBodies) ? new Map() : requestBodies,
    parameters: isNil(parameters) ? new Map() : parameters,
    types: isNil(types) ? new Map() : types,
  }
}

export function createContext(base: Partial<FactoryContext> = {}): FactoryContext {
  return {
    config: createConfig(base.config),
    model: createModel(base.model),
    issues: isNil(base.issues) ? [] : base.issues,
  }
}
