import { refValidator, schemaValidator } from '../../sanitization/schemaObject'
import { ReferenceObject, SchemaObject } from '../../schema'
import {
  ArrayType,
  BooleanType,
  DictionaryType,
  EnumType,
  EnumValue,
  ModelType,
  NumberFormat,
  NumberType,
  StringFormat,
  StringType,
  TypedObjectType,
  TypedObjectTypeField,
} from '../../types'
import { entries, isNil, isRefType } from '../../utils'
import { SchemaFactoryContext, SchemaOrRefFactoryContext } from './FactoryContext'
import { withValidaton } from './utils'

export function createStringType(context: SchemaFactoryContext): string {
  const { schemaName, schema, uri } = context
  const { deprecated, description, format, maxLength, minLength, pattern } = schema

  const stringType: StringType = {
    __type: ModelType.StringType,
    name: schemaName,
    uri,
    deprecated,
    description,
    maxLength,
    minLength,
    pattern,
    format: format as StringFormat,
  }
  context.types.push(stringType)

  return uri
}

export function createNumberType(context: SchemaFactoryContext): string {
  const { schemaName, schema, uri } = context
  const { deprecated, description, multipleOf, minimum, maximum, exclusiveMinimum, exclusiveMaximum } = schema
  const format = schema.type === 'integer' || schema.type === 'int' ? NumberFormat.Integer : NumberFormat.Float

  const numerType: NumberType = {
    __type: ModelType.NumberType,
    uri,
    name: schemaName,
    deprecated,
    description,
    multipleOf,
    minimum,
    maximum,
    exclusiveMinimum,
    exclusiveMaximum,
    format,
  }

  context.types.push(numerType)

  return uri
}

export function createBooleanType(context: SchemaFactoryContext): string {
  const { schemaName, schema, uri } = context
  const { deprecated, description } = schema

  const booleanType: BooleanType = {
    __type: ModelType.BooleanType,
    uri,
    name: schemaName,
    deprecated,
    description,
  }

  context.types.push(booleanType)

  return uri
}

export function createArrayType(context: SchemaFactoryContext): string {
  const { schemaName, schema, uri, pathAccessor: a } = context
  const { deprecated, description, maxItems, minItems, uniqueItems } = schema

  const arrayType: ArrayType = {
    __type: ModelType.ArrayType,
    name: schemaName,
    uri,
    deprecated,
    description,
    maxItems,
    minItems,
    uniqueItems,
    itemType: null,
    __itemTypeRef: createType({
      ...context,
      schema: schema.items,
      uri: a.append(uri, 'items'),
      schemaName: null,
    }),
  }

  context.types.push(arrayType)

  return uri
}

function createTypedObjectTypeFields(context: SchemaFactoryContext): TypedObjectTypeField[] {
  const { schema, uri, pathAccessor: a } = context
  const { properties } = schema
  return entries<SchemaObject | ReferenceObject>(properties).map(
    ([propName, propSchema]): TypedObjectTypeField => {
      const propUri = a.append(uri, 'properties', propName)
      return {
        __type: ModelType.TypedObjectTypeField,
        isRequired: (schema.required || []).indexOf(propName) >= 0,
        name: propName,
        type: null,
        uri: propUri,
        __typeRef: createType({
          ...context,
          uri: propUri,
          schemaName: null,
          schema: propSchema,
        }),
      }
    },
  )
}

export function createTypedObjectType(context: SchemaFactoryContext): string {
  const { schemaName, schema, uri } = context
  const { deprecated, description } = schema

  const objectType: TypedObjectType = {
    __type: ModelType.TypedObjectType,
    name: schemaName,
    uri,
    deprecated,
    description,
    fields: createTypedObjectTypeFields(context),
  }

  context.types.push(objectType)

  return uri
}

export function createDictionaryType(context: SchemaFactoryContext): string {
  const { schemaName, schema, uri, pathAccessor: a } = context
  const { deprecated, description } = schema

  const dictionaryType: DictionaryType = {
    __type: ModelType.DictionaryType,
    name: schemaName,
    uri,
    deprecated,
    description,
    valueType: null,
    __valueTypeRef: createType({
      ...context,
      schema: schema.additionalProperties,
      uri: a.append(uri, 'additionalProperties'),
      schemaName: null,
    }),
  }

  context.types.push(dictionaryType)

  return uri
}

function createEnumValues(context: SchemaFactoryContext): EnumValue[] {
  const { schema } = context
  const varNames = isNil(schema['x-enum-varnames']) ? Array.from(schema.enum) : schema['x-enum-varnames']
  const descriptions = isNil(schema['x-enum-descriptions'])
    ? schema.enum.map(() => null)
    : schema['x-enum-descriptions']

  return schema.enum.map((value, index) => {
    const name = varNames[index]
    const description = descriptions[index]
    return {
      __type: ModelType.EnumValue,
      uri: 'TODO',
      name,
      value,
      description,
    }
  })
}

export function createEnumType(context: SchemaFactoryContext): string {
  const { schemaName, schema, uri } = context
  const { description, deprecated } = schema

  const enumType: EnumType = {
    __type: ModelType.EnumType,
    uri,
    name: schemaName,
    description,
    deprecated,
    values: createEnumValues(context),
  }

  context.types.push(enumType)

  return uri
}

export function createType(context: SchemaOrRefFactoryContext): string {
  const { schema, pathAccessor: a } = context

  // If it's a ref, in we can simply build a full URI and worry about it later
  if (isRefType(schema)) {
    return withValidaton<string>(context, refValidator, () => {
      // Check if it has the document in the URI, meaning it referrs to a different document
      const ownDocument = a.document(schema.$ref)
      // If not take the current document and add the segments to it
      if (isNil(ownDocument)) {
        return a.create(a.document(context.uri), a.segments(schema.$ref))
      }
      // Otherwise we have the whole URI
      return schema.$ref
    })
  }
  return withValidaton<string>(context, schemaValidator, () => {
    // If it's a schema we can switch on the type and go from there:
    switch (schema.type) {
      case 'string': {
        return createStringType(context)
      }
      case 'number':
      case 'int':
      case 'integer':
      case 'float': {
        return createNumberType(context)
      }
      case 'boolean': {
        return createBooleanType(context)
      }
      case 'object': {
        if (!isNil(schema.additionalProperties)) {
          return createDictionaryType(context)
        } else {
          return createTypedObjectType(context)
        }
      }
      case 'array': {
        return createArrayType(context)
      }
      default: {
        // TODO
      }
    }
    return null
  })
}
