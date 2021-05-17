import { ModelType, TypedObjectType } from '../types'
import { makeType } from './astGenerators'
import { astToString } from './astPrint'

describe('ast gen', () => {
  it('should do something', () => {
    const type: TypedObjectType = {
      __type: ModelType.TypedObjectType,
      name: 'TestObject',
      fields: [
        {
          __type: ModelType.TypedObjectTypeField,
          name: 'test',
          type: {
            __type: ModelType.StringType,
          },
        },
        {
          __type: ModelType.TypedObjectTypeField,
          isRequired: true,
          name: 'num',
          type: {
            __type: ModelType.NumberType,
          },
        },
        {
          __type: ModelType.TypedObjectTypeField,
          name: 'bum',
          type: {
            __type: ModelType.ArrayType,
            itemType: {
              __type: ModelType.StringType,
            },
          },
        },
        {
          __type: ModelType.TypedObjectTypeField,
          name: 'nest',
          type: {
            name: 'Foo',
            __type: ModelType.TypedObjectType,
            fields: [
              {
                __type: ModelType.TypedObjectTypeField,
                name: 'test',
                type: {
                  __type: ModelType.StringType,
                },
              },
              {
                __type: ModelType.TypedObjectTypeField,
                isRequired: true,
                name: 'num',
                type: {
                  __type: ModelType.NumberType,
                },
              },
              {
                __type: ModelType.TypedObjectTypeField,
                name: 'bum',
                type: {
                  __type: ModelType.ArrayType,
                  itemType: {
                    __type: ModelType.StringType,
                  },
                },
              },
            ],
          },
        },
      ],
    }

    console.log(astToString(makeType(type)))
  })
})
