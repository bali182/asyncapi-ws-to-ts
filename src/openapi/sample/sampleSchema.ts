import { OpenAPIObject } from '../../schema'

export const sampleSchema: OpenAPIObject = {
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
        oneOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
          {
            type: 'boolean',
          },
        ],
      },
      Mammal: {
        type: 'object',
        discriminator: {
          propertyName: 'mammalType',
          mapping: {
            Human: '#/components/schemas/Human',
            Animal: '#/components/schemas/Animal',
          },
        },
        oneOf: [
          {
            $ref: '#/components/schemas/Animal',
          },
          {
            $ref: '#/components/schemas/Human',
          },
        ],
      },
      Animal: {
        discriminator: {
          propertyName: 'animalType',
          mapping: {
            Dog: '#/components/schemas/Dog',
            Cat: '#/components/schemas/Cat',
          },
        },
        oneOf: [
          {
            $ref: '#/components/schemas/Cat',
          },
          {
            $ref: '#/components/schemas/Dog',
          },
          {
            type: 'object',
            properties: {
              str: {
                type: 'string',
              },
            },
          },
        ],
      },
      Cat: {
        type: 'object',
        properties: {},
      },
      Dog: {
        type: 'object',
        properties: {},
      },
      Human: {
        type: 'object',
        properties: {},
      },
    },
  },
}
