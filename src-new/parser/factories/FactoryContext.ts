import { PathAccessor, URIPathAccessor } from '../../pathAccessors'
import { OperationType, ParameterType, Type } from '../../types/types'
import { Issue } from '../../validation/typings'

export type URITransform = (uri: string) => string

export type FactoryInput<S> = {
  readonly uri: string
  readonly data: S
  readonly name: string
}

export type FactoryContext = {
  readonly model: OpenAPIModel
  readonly issues: Issue[]
  readonly path: PathAccessor
  readonly transformRef: URITransform
}

export type OpenAPIModel = {
  readonly types: Map<string, Type>
  readonly operations: Map<string, OperationType>
  readonly parameters: Map<string, ParameterType>
  readonly responses: Map<string, any>
  readonly requestBodies: Map<string, any>
  readonly headers: Map<string, any>
}

export function emptyContext(): FactoryContext {
  return {
    path: new URIPathAccessor(),
    model: {
      types: new Map(),
      operations: new Map(),
      parameters: new Map(),
      responses: new Map(),
      requestBodies: new Map(),
      headers: new Map(),
    },
    transformRef: (input: string) => input,
    issues: [],
  }
}
