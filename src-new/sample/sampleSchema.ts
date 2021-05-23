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
      UnionOfPrimitives: {
        oneOf: [{ type: 'number' }, { type: 'string' }, { type: 'boolean' }],
      },
      Animal: {
        type: 'object',
        discriminator: {
          propertyName: 'type',
          mapping: {
            Dog: '#/components/schemas/Dog',
            Cat: '#/components/schemas/Cat',
          },
        },
        oneOf: [{ $ref: '#/components/schemas/Cat' }, { $ref: '#/components/schemas/Dog' }],
      },
      Cat: {
        type: 'object',
        properties: {},
      },
      Dog: {
        type: 'object',
        properties: {},
      },
    },
  },
}
