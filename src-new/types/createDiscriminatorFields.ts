import { isNil } from '../utils'
import { noRef } from './ref'
import { ModelType, ObjectType, Ref, UnionType } from './types'

export function createDiscriminatorFields(unionType: UnionType): void {
  const { property, types } = unionType

  if (isNil(property)) {
    return
  }

  const objectTypeRefs = Array.from(types.keys())
    .filter((ref) => ref.value()?.__type === ModelType.ObjectType)
    .filter((ref) => !isNil(types.get(ref))) as Ref<ObjectType>[]

  for (const ref of objectTypeRefs) {
    const objType = ref.value()
    const value = types.get(ref)

    objType.fields.unshift({
      __type: ModelType.ObjectField,
      isRequired: true,
      name: property,
      type: noRef,
      uri: null, // TODO synthetic field, is this ok?
      value,
    })
  }
}
