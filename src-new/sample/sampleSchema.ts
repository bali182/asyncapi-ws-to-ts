import { OpenAPIObject } from '../schema'

export const schema: OpenAPIObject = {
  openapi: '3.1',
  components: {
    schemas: {
      StringType: {
        type: 'string',
      },
      NumberType: {
        type: 'number',
      },
      BooleanType: {
        type: 'boolean',
      },
      EnumType: {
        type: 'string',
        enum: ['A', 'B', 'C'],
      },
      StringArrayType: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      NumberDictionaryType: {
        type: 'object',
        additionalProperties: {
          type: 'number',
        },
      },
      ObjectWithKeys: {
        type: 'object',
        properties: {
          stringField: { type: 'string' },
          numberField: { type: 'number' },
          booleanField: { type: 'boolean' },
          arrayField: { type: 'array', items: { type: 'string' } },
          dictField: { type: 'object', additionalProperties: { type: 'boolean' } },
          enumRefField: { $ref: '#/components/schemas/EnumType' },
        },
      },
    },
  },
}
