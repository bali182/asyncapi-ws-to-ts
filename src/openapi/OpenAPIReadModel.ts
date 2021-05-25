import { OperationType, ParameterType, Type } from './types/types'

export type OpenAPIReadModel = {
  readonly types: Map<string, Type>
  readonly operations: Map<string, OperationType>
  readonly parameters: Map<string, ParameterType>
  readonly responses: Map<string, any>
  readonly requestBodies: Map<string, any>
}
