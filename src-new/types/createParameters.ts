import { FactoryContext, FactoryInput } from '../FactoryContext'
import { ParameterObject, ParametersObject, ReferenceObject } from '../schema'
import { entries } from '../utils'
import { createParameter } from './createParameter'

export function createParameters(input: FactoryInput<ParametersObject>, context: FactoryContext): void {
  const { uri, data } = input

  for (const [name, schema] of entries(data)) {
    const input: FactoryInput<ParameterObject | ReferenceObject> = {
      name,
      data: schema,
      uri: context.config.uri.append(uri, name),
    }
    createParameter(input, context)
  }
}
