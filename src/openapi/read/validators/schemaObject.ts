import { SchemaObject } from 'openapi3-ts'
import { ValueType } from '../../../validation/typings'
import { boolean, fields, object, optional, string, number, array, itemsOf, type } from '../../../validation/Validators'

export const schemaObject = object(
  fields<SchemaObject>({
    type: optional(string()),
    format: optional(string()),
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
    enum: optional(array(itemsOf(type(ValueType.STRING, ValueType.NUMBER)()))),
    discriminator: optional(object()),
    properties: optional(object()),
    allOf: optional(array()),
    oneOf: optional(array()),
    anyOf: optional(array()),
    items: optional(object()),
    additionalProperties: optional(object()),
  }),
)
