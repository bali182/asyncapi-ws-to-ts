import { schema } from './schemaObject'
import { FragmentURI } from '../FragmentURI'

describe(schema.name, () => {
  it('should validate', () => {
    console.log(JSON.stringify(schema({ discriminator: {}, items: [] }), null, 2))
  })
  it('should uri', () => {
    const uri = new FragmentURI('test.json#/TEST/asd/1/asd/23/2')
    console.log(uri.fragments())
    console.log(uri.normalizeFragment().valueOf())
  })
})
