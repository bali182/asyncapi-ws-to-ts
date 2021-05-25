import { append, sanitize, resolve } from './uri/defaultFns'
import { OperationType, ParameterType, Type } from './types/types'
import { isNil } from './utils'
import { Issue } from './validation/typings'
import { SourceFile } from 'typescript'

export type ContentReader<Config, Context> = (config: Config) => Promise<Context>
export type Generator<Context, Output> = (context: Context) => Promise<Output>
export type Writer<Output> = (output: Output) => Promise<void>

export type CompilationUnit<T> = {
  path: string
  content: T
}

export type TsCompilationUnit = CompilationUnit<SourceFile>

export type Input<S> = {
  readonly uri: string
  readonly data: S
  readonly name?: string
}

export type OpenAPIModel = {
  readonly model: OpenAPIReadData
  readonly config: OpenAPIConfig
  readonly issues: Issue[]
}

export type URIManipulator = {
  append(path: string, ...segments: string[]): string
  resolve(ref: string, parent: string): string
  sanitize(path: string): string
}

export type OpenAPIReadData = {
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
  const { append: _append, resolve: _resolve, sanitize: _sanitize } = base
  return {
    append: isNil(_append) ? append : _append,
    resolve: isNil(_resolve) ? resolve : _resolve,
    sanitize: isNil(_sanitize) ? sanitize : _sanitize,
  }
}

export function createConfig(base: Partial<OpenAPIConfig> = {}): OpenAPIConfig {
  return {
    uri: createURIManipulator(base.uri),
  }
}

export function createModel(base: Partial<OpenAPIReadData> = {}): OpenAPIReadData {
  const { operations, responses, requestBodies, parameters, types } = base
  return {
    operations: isNil(operations) ? new Map() : operations,
    responses: isNil(responses) ? new Map() : responses,
    requestBodies: isNil(requestBodies) ? new Map() : requestBodies,
    parameters: isNil(parameters) ? new Map() : parameters,
    types: isNil(types) ? new Map() : types,
  }
}

export function createContext(base: Partial<OpenAPIModel> = {}): OpenAPIModel {
  return {
    config: createConfig(base.config),
    model: createModel(base.model),
    issues: isNil(base.issues) ? [] : base.issues,
  }
}
