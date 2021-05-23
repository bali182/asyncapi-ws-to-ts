import { makeType } from './ast/astGenerators'
import { astToString } from './ast/astPrint'
import { isNil } from './utils'
import { schema } from './sample/sampleSchema'
import { createOpenAPIModel } from './types/createOpenAPIModel'
import { sanitizeUri } from './uri/sanitizeUri'

describe('parsing schema', () => {
  it('should parse schema', () => {
    const uri = sanitizeUri('test.json')
    const context = createOpenAPIModel(sanitizeUri('test.json'), schema, undefined)

    console.log(context.model.types)

    const asts = Array.from(context.model.types.values())
      .filter((t) => !isNil(t.name))
      .map((type) => makeType(type))

    console.log(astToString(...asts))
  })
})
