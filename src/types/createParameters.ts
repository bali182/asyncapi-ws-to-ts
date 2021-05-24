import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ParametersObject } from '../schema'
import { entries } from '../utils'
import { createParameter } from './createParameter'

export function createParameters(input: FactoryInput<ParametersObject>, context: FactoryContext): void {
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
