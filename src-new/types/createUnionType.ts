import { FactoryContext, FactoryInput } from '../parser/factories/FactoryContext'
import { resolveUri } from '../parser/factories/resolveUri'
import { SchemaObject } from '../schema'
import { entries } from '../utils'
import { createType } from './createType'
import { ref } from './ref'
import { UnionType, ModelType, Ref, Type } from './types'

export function createUnionType(input: FactoryInput<SchemaObject>, context: FactoryContext): Ref<Type> {
  const { data, name, uri } = input
  const { oneOf, discriminator, deprecated, description } = data
  const { propertyName: property, mapping: _mapping } = discriminator || {}

  // Reverse mapping from ref -> property value where the ref is resolved properly
  const mapping = entries(_mapping || {}).reduce(
    (map, [propertyValue, ref]) => map.set(resolveUri(ref, uri, context.transformRef), propertyValue),
    new Map<string, string>(),
  )

  // Ref<Type> to property value mapping, where property value might be null
  const types = oneOf
    .map((type, i) =>
      createType(
        {
          uri: context.path.append(uri, 'oneOf', i.toString()),
          name: null,
          data: type,
        },
        context,
      ),
    )
    .reduce((map, ref) => map.set(ref, mapping.get(ref.uri)), new Map<Ref<Type>, string>())

  const unionType: UnionType = {
    __type: ModelType.UnionType,
    property,
    deprecated,
    description,
    name,
    uri,
    types,
  }
  context.model.types.set(uri, unionType)
  return ref(input.uri, context.model.types)
}
