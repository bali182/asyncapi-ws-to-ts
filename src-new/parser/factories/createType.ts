import { refValidator, schemaValidator } from '../../sanitization/schemaObject'
import { ReferenceObject, SchemaObject } from '../../schema'
import {
  $RefType,
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
import { resolveUri } from './resolveUri'
import { FactoryContext, FactoryInput } from './FactoryContext'
import { withValidaton } from './utils'

export function createStringType(input: FactoryInput<SchemaObject>, context: FactoryContext): $RefType {
  const { name, data, uri } = input
  const { deprecated, description, format, maxLength, minLength, pattern } = data

  const stringType: StringType = {
    __type: ModelType.StringType,
    name,
    uri,
    deprecated,
    description,
    maxLength,
    minLength,
    pattern,
    format: format as StringFormat,
  }
  context.types.push(stringType)

  return {
    __type: ModelType.$RefType,
    uri,
    name,
  }
}

export function createNumberType(input: FactoryInput<SchemaObject>, context: FactoryContext): $RefType {
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

  context.types.push(numerType)

  return {
    __type: ModelType.$RefType,
    uri,
    name,
  }
}

export function createBooleanType(input: FactoryInput<SchemaObject>, context: FactoryContext): $RefType {
  const { name, data, uri } = input
  const { deprecated, description } = data

  const booleanType: BooleanType = {
    __type: ModelType.BooleanType,
    uri,
    name,
    deprecated,
    description,
  }

  context.types.push(booleanType)

  return {
    __type: ModelType.$RefType,
    uri,
    name,
  }
}

export function createArrayType(input: FactoryInput<SchemaObject>, context: FactoryContext): $RefType {
  const { name, data, uri, pathAccessor: a } = input
  const { deprecated, description, maxItems, minItems, uniqueItems } = data

  const arrayType: ArrayType = {
    __type: ModelType.ArrayType,
    name,
    uri,
    deprecated,
    description,
    maxItems,
    minItems,
    uniqueItems,
    itemType: createType(
      {
        ...input,
        data: data.items,
        uri: a.append(uri, 'items'),
        name: null,
      },
      context,
    ),
  }

  context.types.push(arrayType)

  return {
    __type: ModelType.$RefType,
    uri,
    name,
  }
}

function createTypedObjectTypeFields(
  input: FactoryInput<SchemaObject>,
  context: FactoryContext,
): TypedObjectTypeField[] {
  const { data, uri, pathAccessor: a } = input
  const { properties } = data
  return entries<SchemaObject | ReferenceObject>(properties).map(
    ([propName, propSchema]): TypedObjectTypeField => {
      const propUri = a.append(uri, 'properties', propName)
      return {
        __type: ModelType.TypedObjectTypeField,
        isRequired: (data.required || []).indexOf(propName) >= 0,
        name: propName,
        type: createType(
          {
            ...input,
            uri: propUri,
            name: null,
            data: propSchema,
          },
          context,
        ),
        uri: propUri,
      }
    },
  )
}

export function createTypedObjectType(input: FactoryInput<SchemaObject>, context: FactoryContext): $RefType {
  const { name, data, uri } = input
  const { deprecated, description } = data

  const objectType: TypedObjectType = {
    __type: ModelType.TypedObjectType,
    name,
    uri,
    deprecated,
    description,
    fields: createTypedObjectTypeFields(input, context),
  }

  context.types.push(objectType)

  return {
    __type: ModelType.$RefType,
    uri,
    name,
  }
}

export function createDictionaryType(input: FactoryInput<SchemaObject>, context: FactoryContext): $RefType {
  const { name, data, uri, pathAccessor: a } = input
  const { deprecated, description } = data

  const dictionaryType: DictionaryType = {
    __type: ModelType.DictionaryType,
    name,
    uri,
    deprecated,
    description,
    valueType: createType(
      {
        ...input,
        data: data.additionalProperties,
        uri: a.append(uri, 'additionalProperties'),
        name: null,
      },
      context,
    ),
  }

  context.types.push(dictionaryType)

  return {
    __type: ModelType.$RefType,
    uri,
    name,
  }
}

function createEnumValues(input: FactoryInput<SchemaObject>): EnumValue[] {
  const { data, uri, pathAccessor: a } = input
  const varNames = isNil(data['x-enum-varnames']) ? Array.from(data.enum) : data['x-enum-varnames']
  const descriptions = isNil(data['x-enum-descriptions']) ? data.enum.map(() => null) : data['x-enum-descriptions']

  return data.enum.map((value, index) => {
    const name = varNames[index]
    const description = descriptions[index]
    return {
      __type: ModelType.EnumValue,
      uri: a.append(uri, index.toString()),
      name,
      value,
      description,
    }
  })
}

export function createEnumType(input: FactoryInput<SchemaObject>, context: FactoryContext): $RefType {
  const { name, data, uri } = input
  const { description, deprecated } = data

  const enumType: EnumType = {
    __type: ModelType.EnumType,
    uri,
    name,
    description,
    deprecated,
    values: createEnumValues(input),
  }

  context.types.push(enumType)

  return {
    __type: ModelType.$RefType,
    uri,
    name,
  }
}

export function createType(input: FactoryInput<SchemaObject | ReferenceObject>, context: FactoryContext): $RefType {
  const { name, data } = input

  // If it's a ref, in we can simply build a full URI and worry about it later
  if (isRefType(data)) {
    return {
      __type: ModelType.$RefType,
      uri: withValidaton<string>(input, context, refValidator, () => resolveUri(data.$ref, input.uri)),
      name,
    }
  }
  return withValidaton<$RefType>(input, context, schemaValidator, () => {
    // If it's a schema we can switch on the type and go from there:
    switch (data.type) {
      case 'string': {
        if (!isNil(data.enum)) {
          return createEnumType(input, context)
        }
        return createStringType(input, context)
      }
      case 'number':
      case 'int':
      case 'integer':
      case 'float': {
        return createNumberType(input, context)
      }
      case 'boolean': {
        return createBooleanType(input, context)
      }
      case 'object': {
        if (!isNil(data.additionalProperties)) {
          return createDictionaryType(input, context)
        } else {
          return createTypedObjectType(input, context)
        }
      }
      case 'array': {
        return createArrayType(input, context)
      }
      default: {
        // TODO
      }
    }
    return null
  })
}
