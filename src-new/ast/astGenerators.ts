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
import { Ref, ArrayType, DictionaryType, EnumType, ModelType, Type, ObjectType, UnionType } from '../types/types'
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
    case ModelType.ObjectType:
      return makeObjectTypeRef(input)
    case ModelType.ArrayType:
      return makeArrayTypeRef(input)
    case ModelType.EnumType:
      return makeLiteralUnionType(input)
    case ModelType.UnionType:
      return makeUnionType(input)
  }
  return f.createKeywordTypeNode(SyntaxKind.AnyKeyword)
}

export function makeTypeReference(ref: Ref<Type>): TypeNode {
  const type = ref.get()
  if (isNil(type)) {
    // Shouldnt happen
    return f.createKeywordTypeNode(SyntaxKind.AnyKeyword)
  }
  if (isNil(type.name)) {
    return makeTypeRighthandSide(type)
  }
  return f.createTypeReferenceNode(type.name)
}

export function makeObjectTypeRef(input: ObjectType): TypeNode {
  const discriminatorFields = input.discriminators.map(
    (field): PropertySignature => {
      return f.createPropertySignature(
        [],
        field.name,
        undefined,
        f.createLiteralTypeNode(f.createStringLiteral(field.value)),
      )
    },
  )
  const fields = input.fields.map(
    (field): PropertySignature =>
      f.createPropertySignature(
        [],
        field.name,
        field.isRequired ? undefined : f.createToken(SyntaxKind.QuestionToken),
        makeTypeReference(field.type),
      ),
  )
  return f.createTypeLiteralNode(discriminatorFields.concat(fields))
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

export function makeLiteralUnionType(input: EnumType): TypeNode {
  return f.createUnionTypeNode(input.values.map((value) => f.createLiteralTypeNode(createEnumValueNode(value.value))))
}

export function makeUnionType(input: UnionType): TypeNode {
  return f.createUnionTypeNode(Array.from(input.types.keys()).map((ref): TypeNode => makeTypeReference(ref)))
}
