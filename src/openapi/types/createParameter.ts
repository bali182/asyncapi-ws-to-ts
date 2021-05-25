import { OpenAPIReadContext, Input } from '../readTypes'
import { ParameterObject, ReferenceObject } from '../../schema'
import { isNil, isRefType } from '../../utils'
import { createType } from './createType'
import { noRef, ref } from './ref'
import { ModelType, ParameterType, Ref } from './types'

const InMap = {
  ['query']: ModelType.QueryParameterType,
  ['header']: ModelType.HeaderParameterType,
  ['path']: ModelType.PathParameterType,
  ['cookie']: ModelType.CookieParameterType,
}

export function createParameter(
  input: Input<ParameterObject | ReferenceObject>,
  context: OpenAPIReadContext,
): Ref<ParameterType> {
  const { data, uri } = input
  const { model, config } = context

  if (isRefType(data)) {
    return ref(config.uri.resolve(data.$ref, input.uri), model.parameters)
  }

  const { allowEmptyValue, explode, name, deprecated, description, style, allowReserved, schema } = data

  // TODO validate in and style
  const parameter: ParameterType = {
    __type: InMap[data.in] as any,
    allowEmptyValue,
    explode,
    name,
    style: style as any,
    urlEncode: !allowReserved,
    deprecated,
    description,
    type: isNil(schema)
      ? noRef
      : createType(
          {
            uri: config.uri.append(uri, 'schema'),
            data: schema,
          },
          context,
        ),
  }

  model.parameters.set(uri, parameter)

  return ref(uri, model.parameters)
}
