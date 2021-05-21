import {
  factory as f,
  SyntaxKind,
  TypeNode,
  PropertySignature,
  EnumMember,
  Statement,
  EnumDeclaration,
  JSDoc,
} from 'typescript'
import { Ref, ArrayType, DictionaryType, EnumType, ModelType, Type, TypedObjectType } from '../types/types'
import { isNil } from '../utils'

export function makeDocs(type: Type): JSDoc {
  if (isNil(type.description)) {
    return undefined
  }
  return f.createJSDocComment(
    type.description,
    type.deprecated ? [f.createJSDocUnknownTag(f.createIdentifier('deprecated'))] : [],
  )
}

export function makeType(input: Type): Statement {
  if (ModelType.EnumType === input.__type) {
    return makeEnumType(input)
  }
  return f.createTypeAliasDeclaration(
    [],
    [f.createModifier(SyntaxKind.ExportKeyword)],
    input.name,
    [],
    makeTypeRighthandSide(input),
  )
}

export function makeTypeRighthandSide(input: Type): TypeNode {
  switch (input.__type) {
    case ModelType.StringType:
      return f.createKeywordTypeNode(SyntaxKind.StringKeyword)
    case ModelType.NumberType:
      return f.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case ModelType.BooleanType:
      return f.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
    case ModelType.DictionaryType:
      return makeDictionaryTypeRef(input)
    case ModelType.TypedObjectType:
      return makeTypedObjectTypeRef(input)
    case ModelType.ArrayType:
      return makeArrayTypeRef(input)
    case ModelType.EnumType:
      return makePrimitiveUnionType(input)
  }
  return f.createKeywordTypeNode(SyntaxKind.AnyKeyword)
}

export function makeTypeReference(ref: Ref<Type>): TypeNode {
  const type = ref.value()
  if (isNil(type)) {
    // Shouldnt happen
    return f.createKeywordTypeNode(SyntaxKind.AnyKeyword)
  }
  if (isNil(type.name)) {
    return makeTypeRighthandSide(type)
  }
  return f.createTypeReferenceNode(type.name)
}

export function makeTypedObjectTypeRef(input: TypedObjectType): TypeNode {
  return f.createTypeLiteralNode(
    input.fields.map(
      (field): PropertySignature =>
        f.createPropertySignature(
          [],
          field.name,
          field.isRequired ? undefined : f.createToken(SyntaxKind.QuestionToken),
          makeTypeReference(field.type),
        ),
    ),
  )
}

export function makeDictionaryTypeRef(input: DictionaryType): TypeNode {
  return f.createTypeLiteralNode([
    f.createIndexSignature(
      [],
      [],
      [
        f.createParameterDeclaration(
          [],
          [],
          undefined,
          'key',
          undefined,
          f.createKeywordTypeNode(SyntaxKind.StringKeyword),
        ),
      ],
      makeTypeReference(input.valueType),
    ),
  ])
}

export function makeArrayTypeRef(input: ArrayType): TypeNode {
  return f.createArrayTypeNode(makeTypeReference(input.itemType))
}

function createEnumValueNode(value: string | number | boolean) {
  if (typeof value === 'string') {
    return f.createStringLiteral(value)
  } else if (typeof value === 'number') {
    return f.createNumericLiteral(value)
  } else if (typeof value === 'boolean') {
    return value ? f.createTrue() : f.createFalse()
  }
}

export function makeEnumType(input: EnumType): EnumDeclaration {
  return f.createEnumDeclaration(
    [],
    [f.createModifier(SyntaxKind.ExportKeyword)],
    input.name,
    input.values.map(
      (value): EnumMember => {
        return f.createEnumMember(value.name, createEnumValueNode(value.value))
      },
    ),
  )
}

export function makePrimitiveUnionType(input: EnumType): TypeNode {
  return f.createUnionTypeNode(input.values.map((value) => f.createLiteralTypeNode(createEnumValueNode(value.value))))
}
