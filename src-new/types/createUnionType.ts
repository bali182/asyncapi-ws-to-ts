import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { SchemaObject } from '../schema'
import { isNil } from '../utils'
import { createType } from './createType'
import { ref } from './ref'
import { DiscriminatedUnionType, ModelType, Ref, Type } from './types'

export function createUnionType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { data, name, uri, pathAccessor: p } = input
  const { oneOf, discriminator, deprecated, description } = data

  const types = oneOf.map((type, i) =>
    createType(
      {
        ...input,
        uri: p.append(uri, 'oneOf', i.toString()),
        name: null,
        data: type,
      },
      context,
    ),
  )
  if (!isNil(discriminator)) {
    const union: DiscriminatedUnionType = {
      __type: ModelType.DiscriminatedUnionType,
      propertyName: discriminator.propertyName,
      deprecated,
      description,
      name,
      uri,
      types: {
        /* TODO */
      },
    }
    context.types.set(uri, union)
  } else {
  }
  return ref(input.uri, context.types)
}
