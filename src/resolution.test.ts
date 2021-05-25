import { makeType } from './ast/astGenerators'
import { isNil } from './utils'
import { sampleSchema } from './sample/sampleSchema'
import { createOpenAPIModel } from './types/createOpenAPIModel'
import { createContext } from './FactoryContext'
import { readSchema } from './readSchema'
import { astToString } from './ast/astPrint'

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

  xit('should read adobe', async () => {
    const context = await readSchema('src/sample/adobe.yaml')

    const asts = Array.from(context.model.types.values())
      .filter((t) => !isNil(t.name))
      .map((type) => makeType(type))

    console.log(astToString(...asts))
  })

  xit('should read nytims', async () => {
    const context = await readSchema('src/sample/nytimes-books.yaml')

    const asts = Array.from(context.model.types.values())
      .filter((t) => !isNil(t.name))
      .map((type) => makeType(type))

    console.log(astToString(...asts))
  })

  it('should read bbc', async () => {
    const context = await readSchema('src/sample/bbc.yaml')
    console.log(context.model.operations)
  })
})
