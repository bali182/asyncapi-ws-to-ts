import {
  boolean,
  dictionaryOf,
  fields,
  object,
  enumeration,
  optional,
  string,
  number,
  array,
  itemsOf,
  primitive,
  union,
} from '../validation/Validators'
import { StringFormat } from '../types'

export const refValidator = object(fields({ $ref: string() }))

const schemaType = string(enumeration(['number', 'int', 'integer', 'float', 'boolean', 'string', 'object', 'array']))

const refOrSchema = () =>
  union({
    ref: refValidator,
    schema: object(fields({ type: schemaType })),
  })

export const schemaValidator = object(
  fields({
    type: schemaType,
    format: optional(string(enumeration(Object.values(StringFormat) as string[]))),
    deprecated: optional(boolean()),
    multipleOf: optional(number()),
    maximum: optional(number()),
    exclusiveMaximum: optional(boolean()),
    minimum: optional(number()),
    exclusiveMinimum: optional(boolean()),
    maxLength: optional(number()),
    minLength: optional(number()),
    pattern: optional(string()),
    maxItems: optional(number()),
    minItems: optional(number()),
    uniqueItems: optional(boolean()),
    description: optional(string()),
    required: optional(array(itemsOf(string()))),
    enum: optional(array(itemsOf(primitive()))),
    discriminator: optional(
      object(
        fields({
          propertyName: string(),
          mapping: object(dictionaryOf(string())),
        }),
      ),
    ),
    properties: optional(object(dictionaryOf(refOrSchema()))),
    allOf: optional(array(itemsOf(refOrSchema()))),
    oneOf: optional(array(itemsOf(refOrSchema()))),
    anyOf: optional(array(itemsOf(refOrSchema()))),
    items: optional(refOrSchema()),
    additionalProperties: optional(refOrSchema()),

    'x-enum-varnames': optional(array(itemsOf(string()))),
    'x-enum-descriptions': optional(array(itemsOf(string()))),
  }),
)
