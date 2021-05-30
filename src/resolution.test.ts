import { document } from './defaults/defaultUriManipulator'
import { harness } from './Harness'
import { openAPI } from './openapi/read/openAPI'
import { OpenAPIGlobalConfig } from './openapi/types/OpenAPIGlobalConfig'
import { OpenAPIReadConfig } from './openapi/types/OpenAPIReadConfig'
import { OpenAPIReadOutput } from './openapi/types/OpenAPIReadOutput'

// const prettierCfg = JSON.parse(readFileSync(resolve('.prettierrc'), 'utf-8'))

describe('parsing schema', () => {
  xit('should do something', async () => {
    const { document, documents } = await harness<
      OpenAPIGlobalConfig,
      OpenAPIReadOutput,
      OpenAPIReadOutput,
      OpenAPIReadOutput
    >()
      .read(openAPI({ path: 'src/openapi/sample/kitchenSink.json' }))
      .generate(() => async (data) => data)
      .write(() => async (data) => data)
      .run()

    console.log(document)
    console.log(documents)
  })
})
