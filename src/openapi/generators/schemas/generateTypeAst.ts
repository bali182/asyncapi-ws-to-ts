import { ReferenceObject, SchemaObject } from 'openapi3-ts'
import { EnumMember, factory as f, PropertySignature, Statement, SyntaxKind, TypeNode } from 'typescript'
import { entries, isNil } from '../../../utils'
import { GeneratorInput } from '../types'
import { SchemaContext } from './types'

function generateEnumValueAst(value: string | number | boolean) {
  if (typeof value === 'string') {
    return f.createStringLiteral(value)
  } else if (typeof value === 'number') {
    return f.createNumericLiteral(value)
  } else if (typeof value === 'boolean') {
    return value ? f.createTrue() : f.createFalse()
  }
}

export function generateEnumAst(input: GeneratorInput<SchemaObject>, context: SchemaContext): Statement {
  const { data } = input
  return f.createEnumDeclaration(
    [],
    [f.createModifier(SyntaxKind.ExportKeyword)],
    context.utils.nameOf(data),
    data.enum.map((value): EnumMember => {
      return f.createEnumMember(value, generateEnumValueAst(value))
    }),
  )
}

export function generateTypeReferenceAst(
  input: GeneratorInput<SchemaObject | ReferenceObject>,
  context: SchemaContext,
): TypeNode {
  const { data } = input
  const schema = isNil(data) ? null : context.utils.dereference(data)
  if (isNil(schema)) {
    return f.createKeywordTypeNode(SyntaxKind.AnyKeyword)
  }
  const name = context.utils.nameOf(schema)
  if (isNil(name)) {
    return generateRighthandSideAst({ data: schema, uri: 'TODO' }, context)
  }
  return f.createTypeReferenceNode(name)
}

// TODO discriminators
export function generateObjectTypeAst(input: GeneratorInput<SchemaObject>, context: SchemaContext): TypeNode {
  const { data } = input

  const fields = entries(data.properties || {}).map(
    ([name, schema]): PropertySignature =>
      f.createPropertySignature(
        [],
        name,
        data?.required?.indexOf(name) >= 0 ? undefined : f.createToken(SyntaxKind.QuestionToken),
        generateTypeReferenceAst({ data: schema, uri: 'TODO' }, context),
      ),
  )
  return f.createTypeLiteralNode(fields)
}
export function generateDictionaryTypeAst(
  input: GeneratorInput<SchemaObject | ReferenceObject>,
  context: SchemaContext,
): TypeNode {
  const { data } = input
  const schema = context.utils.dereference(data)

  return f.createTypeReferenceNode(f.createIdentifier('Record'), [
    f.createKeywordTypeNode(SyntaxKind.StringKeyword),
    generateTypeReferenceAst({ data: schema.additionalProperties as any, uri: 'TODO' }, context),
  ])
}

export function generateArrayTypeAst(input: GeneratorInput<SchemaObject>, context: SchemaContext): TypeNode {
  const { data } = input
  return f.createArrayTypeNode(generateTypeReferenceAst({ data: data.items, uri: 'TODO' }, context))
}

export function generateRighthandSideAst(input: GeneratorInput<SchemaObject>, context: SchemaContext): TypeNode {
  const { data } = input
  switch (data.type) {
    case 'string':
      return f.createKeywordTypeNode(SyntaxKind.StringKeyword)
    case 'number':
    case 'integer':
      return f.createKeywordTypeNode(SyntaxKind.NumberKeyword)
    case 'boolean':
      return f.createKeywordTypeNode(SyntaxKind.BooleanKeyword)
    case 'object':
      if (!isNil(data.additionalProperties)) {
        return generateDictionaryTypeAst(input, context)
      }
      return generateObjectTypeAst(input, context)
    case 'array':
      return generateArrayTypeAst(input, context)
    case 'null':
      return f.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
    default:
      return f.createKeywordTypeNode(SyntaxKind.AnyKeyword)
  }
}

export function generateTypeAst(input: GeneratorInput<SchemaObject>, context: SchemaContext): Statement {
  const { data } = input
  if (!isNil(data.enum)) {
    return generateEnumAst(input, context)
  }

  return f.createTypeAliasDeclaration(
    [],
    [f.createModifier(SyntaxKind.ExportKeyword)],
    context.utils.nameOf(data),
    [],
    generateRighthandSideAst(input, context),
  )
}
