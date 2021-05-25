import { OpenAPIReadContext, Input } from '../OpenAPIReadContext'
import { ParametersObject } from '../../schema'
import { entries } from '../../utils'
import { createParameter } from './createParameter'

export function createParameters(input: Input<ParametersObject>, context: OpenAPIReadContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries(data)) {
    createParameter(
      {
        name,
        data: schema,
        uri: context.config.uri.append(uri, name),
      },
      context,
    )
  }
}
