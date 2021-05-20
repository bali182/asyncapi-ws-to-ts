import { makeType } from '../../ast/astGenerators'
import { astToString } from '../../ast/astPrint'
import { URIPathAccessor } from '../../pathAccessors'
import { OpenAPIObject, ReferenceObject, SchemaObject } from '../../schema'
import { entries, isNil } from '../../utils'
import { createType } from './createType'
import { FactoryContext, FactoryInput } from './FactoryContext'
import { fileURLToPath, pathToFileURL } from 'url'
import { parse } from 'path'
import { isUri } from 'valid-url'

const spec: OpenAPIObject = {
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

describe('parsing schema', () => {
  xit('should parse schema', () => {
    const context: FactoryContext = {
      issues: [],
      headers: [],
      operations: [],
      parameters: [],
      types: [],
      requestBodies: [],
      responses: [],
    }

    const pathAccessor = new URIPathAccessor()

    entries<SchemaObject | ReferenceObject>(spec.components.schemas).forEach(([name, data]) => {
      const input: FactoryInput<SchemaObject | ReferenceObject> = {
        name,
        data,
        pathAccessor,
        uri: pathAccessor.append('test.json#/components/schemas', name),
      }
      createType(input, context)
    })

    const asts = context.types.filter((t) => !isNil(t.name)).map((type) => makeType(type))

    console.log(astToString(...asts))
  })

  it('a', () => {
    console.log(pathToFileURL('C:/Windows/frog').toString())
    console.log(parse('/cat/a/a/a/acasda%^sddfg.json'))
    console.log(isUri('http://frog.com'))
  })
})
