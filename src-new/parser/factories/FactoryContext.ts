import { Type } from '../../types'

export type FactoryContext = {
  path: string[]
  documentUri: string
  types: Type[]
}
