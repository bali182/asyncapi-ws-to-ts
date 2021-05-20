import { ModelType, TypedObjectType } from '../types'
import { makeDocs, makeType } from './astGenerators'
import { astToString } from './astPrint'

describe('ast gen', () => {
  it('should do something', () => {
    const type: TypedObjectType = {
      __type: ModelType.TypedObjectType,
      name: 'TestObject',
      deprecated: true,
      description: 'Hello this is docs',
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
    }

    console.log(astToString(makeDocs(type), makeType(type)))
  })
})
