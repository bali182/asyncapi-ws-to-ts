import { schemaValidator } from './schemaObject'

describe(schemaValidator.name, () => {
  it('should validate', () => {
    console.log(JSON.stringify(schemaValidator({ discriminator: {}, items: [] }), null, 2))
  })
})
