import { PathAccessor } from '../../pathAccessors'
import { OperationType, ParameterType, Type } from '../../types/types'
import { Issue } from '../../validation/typings'

export type FactoryInput<S> = {
  readonly uri: string
  readonly pathAccessor: PathAccessor
  readonly data: S
  readonly name: string
}

export type FactoryContext = {
  readonly types: Map<string, Type>
  readonly operations: Map<string, OperationType>
  readonly parameters: Map<string, ParameterType>
  readonly responses: Map<string, any>
  readonly requestBodies: Map<string, any>
  readonly headers: Map<string, any>
  readonly issues: Issue[]
}

export function emptyContext(): FactoryContext {
  return {
    types: new Map(),
    operations: new Map(),
    parameters: new Map(),
    responses: new Map(),
    requestBodies: new Map(),
    headers: new Map(),
    issues: [],
  }
}
