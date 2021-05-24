import { FactoryContext, FactoryInput } from '../FactoryContext'
import { HeaderObject, ReferenceObject } from '../schema'
import { isRefType } from '../utils'
import { createType } from './createType'
import { ref } from './ref'
import { HeaderParameterType, ModelType, Ref } from './types'

export function createHeader(
  input: FactoryInput<HeaderObject | ReferenceObject>,
  context: FactoryContext,
): Ref<HeaderParameterType> {
  const { data, uri, name } = input
  const { model, config } = context

  if (isRefType(data)) {
    return ref(config.uri.resolve(data.$ref, input.uri), model.parameters) as Ref<HeaderParameterType>
  }

  const { allowEmptyValue, explode, deprecated, description, style, allowReserved, schema } = data

  // TODO validate in and style
  const parameter: HeaderParameterType = {
    __type: ModelType.HeaderParameterType,
    allowEmptyValue,
    explode,
    name,
    style: style as any,
    urlEncode: !allowReserved,
    deprecated,
    description,
    type: createType(
      {
        uri: config.uri.append(uri, 'schema'),
        data: schema,
      },
      context,
    ),
  }

  model.parameters.set(uri, parameter)

  return ref(uri, model.parameters) as Ref<HeaderParameterType>
}
