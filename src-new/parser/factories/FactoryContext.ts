import { PathAccessor } from '../../pathAccessors'
import { OperationType, ParameterType, Type } from '../../types'
import { Issue } from '../../validation/typings'

export type FactoryInput<S> = {
  readonly uri: string
  readonly pathAccessor: PathAccessor
  readonly data: S
  readonly name: string
}

export type FactoryContext = {
  readonly types: Type[]
  readonly operations: OperationType[]
  readonly parameters: ParameterType[]
  readonly responses: any[]
  readonly requestBodies: any[]
  readonly headers: any[]
  readonly issues: Issue[]
}
