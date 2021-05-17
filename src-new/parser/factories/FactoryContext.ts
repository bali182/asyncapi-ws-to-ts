import { PathAccessor } from '../../pathAccessors'
import { OperationType, ParameterType, Type } from '../../types'
import { Issue } from '../../validation/typings'

export type FactoryContext<S> = {
  readonly uri: string
  readonly pathAccessor: PathAccessor
  readonly data: S
  readonly name: string

  types: Type[]
  operations: OperationType[]
  parameters: ParameterType[]
  responses: any[]
  requestBodies: any[]
  headers: any[]

  issues: Issue[]
}
