import { PathAccessor } from '../../pathAccessors'
import { ReferenceObject, SchemaObject } from '../../schema'
import { Type } from '../../types'
import { Issue } from '../../validation/typings'

export type FactoryContext<S> = {
  readonly uri: string
  readonly pathAccessor: PathAccessor
  readonly schema: S
  readonly schemaName: string

  types: Type[]
  issues: Issue[]
}

export type SchemaFactoryContext = FactoryContext<SchemaObject>
export type SchemaOrRefFactoryContext = FactoryContext<SchemaObject | ReferenceObject>
