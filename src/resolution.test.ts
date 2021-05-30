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
import { byName } from './openapi/generators/pathProviders'
import { openAPI } from './openapi/read/openAPI'

const prettierCfg = JSON.parse(readFileSync(resolve('.prettierrc'), 'utf-8'))

describe('parsing schema', () => {
  xit('should do something', async () => {
    await harness<OpenAPIReadModel, TsGeneratorOutput, any>()
      .read(
        openAPIReader({
          root: 'src/openapi/sample/kitchenSink.json',
        }),
      )
      .generate(
        combine(
          types({
            path: byName('trash/cat/dog', 'ts'),
          }),
        ),
      )
      .write(
        toDisk({
          stringify: prettierStringify(prettierCfg),
        }),
      )
      .run()
  })
  it('should not crap the bed', async () => {
    const { issues, references, spec } = await openAPI({ path: 'src/openapi/sample/kitchenSink.json' })()
    console.log(JSON.stringify(spec, null, 2))
  })
})
