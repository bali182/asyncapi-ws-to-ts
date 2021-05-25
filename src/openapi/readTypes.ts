import { Issue } from '../validation/typings'

import { OperationType, ParameterType, Type } from './types/types'

export type OpenAPIReadModel = {
  readonly types: Map<string, Type>
  readonly operations: Map<string, OperationType>
  readonly parameters: Map<string, ParameterType>
  readonly responses: Map<string, any>
  readonly requestBodies: Map<string, any>
}

export type URIManipulator = {
  append(path: string, ...segments: string[]): string
  resolve(ref: string, parent: string): string
  sanitize(path: string): string
}

export type OpenAPIReadConfig = {
  readonly root: string
  readonly uri: URIManipulator
}

export type Input<S> = {
  readonly uri: string
  readonly data: S
  readonly name?: string
}

export type OpenAPIReadContext = {
  readonly model: OpenAPIReadModel
  readonly config: OpenAPIReadConfig
  readonly issues: Issue[]
}
