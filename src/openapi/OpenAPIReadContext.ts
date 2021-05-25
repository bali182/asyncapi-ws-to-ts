import { Issue } from '../validation/typings'
import { OpenAPIReadConfig } from './OpenAPIReadConfig'
import { OpenAPIReadModel } from './OpenAPIReadModel'

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
