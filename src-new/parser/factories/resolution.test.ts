import { makeType } from '../../ast/astGenerators'
import { astToString } from '../../ast/astPrint'
import { URIPathAccessor } from '../../pathAccessors'
import { OpenAPIObject, ReferenceObject, SchemaObject } from '../../schema'
import { entries, isNil } from '../../utils'
import { createType } from '../../types/createType'
import { emptyContext, FactoryInput } from './FactoryContext'
import { schema } from '../../sample/sampleSchema'

describe('parsing schema', () => {
  it('should parse schema', () => {
    const context = emptyContext()
    const pathAccessor = new URIPathAccessor()

    entries<SchemaObject | ReferenceObject>(schema.components.schemas).forEach(([name, data]) => {
      const input: FactoryInput<SchemaObject | ReferenceObject> = {
        name,
        data,
        uri: context.path.append('test.json#/components/schemas', name),
      }
      createType(input, context)
    })

    const asts = Array.from(context.model.types.values())
      .filter((t) => !isNil(t.name))
      .map((type) => makeType(type))

    console.log(astToString(...asts))
  })
})
