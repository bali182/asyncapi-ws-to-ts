import { makeType } from './openapi/ast/astGenerators'
import { isNil } from './utils'
import { sampleSchema } from './openapi/sample/sampleSchema'
import { createOpenAPIModel } from './openapi/types/createOpenAPIModel'
import { astToString } from './openapi/ast/astPrint'
import { createContext } from './openapi/defaults'
import { harness } from './Harness'
import { openAPIReader } from './openapi/openAPIReader'
import { OpenAPIReadModel } from './openapi/OpenAPIReadModel'

describe('parsing schema', () => {
  xit('should parse schema', () => {
    const context = createOpenAPIModel(
      {
        data: sampleSchema,
        uri: 'test.json',
      },
      createContext(),
    )

    const asts = Array.from(context.model.types.values())
      .filter((t) => !isNil(t.name))
      .map((type) => makeType(type))

    console.log(astToString(...asts))
  })

  it('should do something', async () => {
    await harness<OpenAPIReadModel, any, any>()
      .read(openAPIReader({ root: 'src/sample/adobe.yaml' }))
      .generate(null)
      .write(null)
      .run()
  })
})
