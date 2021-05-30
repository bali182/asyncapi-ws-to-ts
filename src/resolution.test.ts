import { harness } from './Harness'
import { openAPI } from './openapi/read/openAPI'
import { OpenAPIGlobalConfig } from './openapi/types/OpenAPIGlobalConfig'
import { OpenAPIReadConfig } from './openapi/types/OpenAPIReadConfig'

// const prettierCfg = JSON.parse(readFileSync(resolve('.prettierrc'), 'utf-8'))

describe('parsing schema', () => {
  xit('should do something', async () => {
    await harness<OpenAPIGlobalConfig, OpenAPIReadConfig, any, any>().read(null).generate(null).write(null).run()
  })
  it('should not crap the bed', async () => {
    const { document } = await openAPI()({ path: 'src/openapi/sample/kitchenSink.json' })()
    console.log(JSON.stringify(document, null, 2))
  })
})
