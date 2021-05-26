import { harness } from './Harness'
import { openAPIReader } from './openapi/openAPIReader'
import { OpenAPIReadModel } from './openapi/readTypes'
import { TsGeneratorOutput } from './openapi/generatorTypes'
import { types } from './openapi/generators/types/types'
import { combine } from './openapi/generators/combine'
import { toDisk } from './openapi/writers/toDisk'
import { prettierStringify } from './openapi/writers/prettierStringify'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const prettierCfg = JSON.parse(readFileSync(resolve('.prettierrc'), 'utf-8'))

describe('parsing schema', () => {
  it('should do something', async () => {
    await harness<OpenAPIReadModel, TsGeneratorOutput, any>()
      .read(openAPIReader({ root: 'src/openapi/sample/kitchenSink.json' }))
      .generate(combine(types()))
      .write(toDisk({ stringify: prettierStringify(prettierCfg) }))
      .run()
  })
})
