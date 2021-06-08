import { readFileSync } from 'fs'
import { resolve } from 'path'
import { harness } from './Harness'
import { defaultStringify, prettierStringify } from './openapi/defaults/defaultOpenAPIWriteConfig'
import { openAPIGenerator } from './openapi/generators/openAPIGenerator'
import { singleFile } from './openapi/generators/pathProviders'
import { schemaTypesGenerator } from './openapi/generators/schemas/schemaTypesGenerator'
import { openAPIReader } from './openapi/read/openAPIReader'
import { OpenAPIGeneratorOutput } from './openapi/types/OpenAPIGeneratorOutput'
import { OpenAPIGlobalConfig } from './openapi/types/OpenAPIGlobalConfig'
import { OpenAPIReadOutput } from './openapi/types/OpenAPIReadOutput'
import { openAPIWriter } from './openapi/writers/openAPIWriter'

const prettierCfg = JSON.parse(readFileSync(resolve('.prettierrc'), 'utf-8'))

describe('parsing schema', () => {
  it('should do something', async () => {
    await harness<OpenAPIGlobalConfig, OpenAPIReadOutput, OpenAPIGeneratorOutput, any>()
      .read(
        openAPIReader({
          path: 'src/openapi/sample/kitchenSink.json',
        }),
      )
      .generate(
        openAPIGenerator(
          schemaTypesGenerator({
            path: singleFile('trash/test.ts'),
          }),
        ),
      )
      .write(openAPIWriter({ stringify: prettierStringify(prettierCfg) }))
      .run()
  })
})
