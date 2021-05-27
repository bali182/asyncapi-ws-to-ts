import { isNil } from '../../../utils'
import { ModelType, Ref, Type } from '../../types/types'

function collectNestedReferences(type: Type, imports: Type[]) {
  switch (type.__type) {
    case ModelType.ArrayType: {
      collectReferencedTypesRecursive(type.itemType, imports)
      break
    }
    case ModelType.DictionaryType: {
      collectReferencedTypesRecursive(type.valueType, imports)
      break
    }
    case ModelType.ObjectType: {
      for (const field of type.fields) {
        collectReferencedTypesRecursive(field.type, imports)
      }
      break
    }
    case ModelType.UnionType: {
      for (const subType of Array.from(type.types.keys())) {
        collectReferencedTypesRecursive(subType, imports)
      }
    }
  }
}

function collectReferencedTypesRecursive(ref: Ref<Type>, imports: Type[]): void {
  if (!ref.isResolved()) {
    return
  }
  const type = ref.get()
  if (!isNil(type.name)) {
    imports.push(type)
    return
  }
  collectNestedReferences(type, imports)
}

export function collectReferencedTypes(type: Type): Type[] {
  const imports: Type[] = []
  collectNestedReferences(type, imports)
  return imports
}
