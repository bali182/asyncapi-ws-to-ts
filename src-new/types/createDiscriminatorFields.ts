import { isNil } from '../utils'
import { ModelType, ObjectType, Ref, Type, UnionType } from './types'

function allObjectTypesFor(ref: Ref<Type>, objectRefs: Ref<ObjectType>[]): Ref<ObjectType>[] {
  // Nothing to do if it's not resolved yet
  if (isNil(ref.value())) {
    return
  }

  // If we got an object, we just add it to the refs, nothing else to do.
  if (ref.value().__type === ModelType.ObjectType) {
    objectRefs.push(ref as Ref<ObjectType>)
  }

  // If we got a union, we are dealing with nested inheritance, need to collect the bottom level objects.
  if (ref.value().__type === ModelType.UnionType) {
    const unionType = ref.value() as UnionType
    for (const refType of Array.from(unionType.types.keys())) {
      allObjectTypesFor(refType, objectRefs)
    }
  }

  return objectRefs
}

export function createDiscriminatorFields(rootType: UnionType): void {
  const { property, types } = rootType

  if (isNil(property)) {
    return
  }

  const discriminatorMap: Map<string, Ref<ObjectType>[]> = new Map()

  // First find all the object types we need to augment with discriminators
  for (const [ref, value] of Array.from(types.entries())) {
    if (isNil(value)) {
      continue
    }
    discriminatorMap.set(value, [])
    allObjectTypesFor(ref, discriminatorMap.get(value))
  }

  // Augment each type with the given discriminator field
  for (const value of Array.from(discriminatorMap.keys())) {
    for (const objTypeRef of discriminatorMap.get(value)) {
      const objType = objTypeRef.value()
      const existingField = objType.discriminators.find((field) => field.name === property)

      if (!isNil(existingField)) {
        // The discriminator has already been added, nothing to do
        if (existingField.value === value) {
          continue
        } else {
          // Otherwise we have a conflict: discriminators with the same name
          const valuesStr = [existingField.value, value].join(', ')
          throw new TypeError(
            `Discriminator with name "${property}" appears twice with values ${valuesStr} in type ${objType.uri}`,
          )
        }
      }

      objType.discriminators.unshift({
        __type: ModelType.DiscriminatorField,
        name: property,
        value,
      })
    }
  }
}
