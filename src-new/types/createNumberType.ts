import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { SchemaObject } from '../schema'
import { ref } from './ref'
import { ModelType, NumberFormat, NumberType, Ref, Type } from './types'

export function createNumberType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { name, data, uri } = input
  const { deprecated, description, multipleOf, minimum, maximum, exclusiveMinimum, exclusiveMaximum } = data
  const format = data.type === 'integer' || data.type === 'int' ? NumberFormat.Integer : NumberFormat.Float

  const numerType: NumberType = {
    __type: ModelType.NumberType,
    uri,
    name,
    deprecated,
    description,
    multipleOf,
    minimum,
    maximum,
    exclusiveMinimum,
    exclusiveMaximum,
    format,
  }

  context.model.types.set(uri, numerType)

  return ref(uri, context.model.types)
}
