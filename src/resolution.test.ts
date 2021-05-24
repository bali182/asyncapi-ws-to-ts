import { makeType } from './ast/astGenerators'
import { astToString } from './ast/astPrint'
import { isNil } from './utils'
import { sampleSchema } from './sample/sampleSchema'
import { createOpenAPIModel } from './types/createOpenAPIModel'

describe('parsing schema', () => {
  it('should parse schema', () => {
    const context = createOpenAPIModel('test.json', sampleSchema, undefined)
    const asts = Array.from(context.model.types.values())
      .filter((t) => !isNil(t.name))
      .map((type) => makeType(type))

    console.log(astToString(...asts))
  })
})
