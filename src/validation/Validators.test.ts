import { Severity } from './typings'
import { array, boolean, fields, itemsOf, number, object, optional, string } from './Validators'

describe('Validators', () => {
  it(string.name, () => {
    const v = string()
    expect(v('cat')).toHaveLength(0)
    expect(v(1)).toHaveLength(1)
    expect(v(null)).toHaveLength(1)
    expect(v(undefined)).toHaveLength(1)
  })
  it(number.name, () => {
    const v = number()
    expect(v(1)).toHaveLength(0)
    expect(v('cat')).toHaveLength(1)
    expect(v(null)).toHaveLength(1)
    expect(v(undefined)).toHaveLength(1)
  })
  it(boolean.name, () => {
    const v = boolean()
    expect(v(false)).toHaveLength(0)
    expect(v(true)).toHaveLength(0)
    expect(v('cat')).toHaveLength(1)
    expect(v(null)).toHaveLength(1)
    expect(v(undefined)).toHaveLength(1)
  })
  it(object.name, () => {
    const v = object()
    expect(v({ foo: 'bar' })).toHaveLength(0)
    expect(v('cat')).toHaveLength(1)
    expect(v(null)).toHaveLength(1)
    expect(v(undefined)).toHaveLength(1)
  })
  it(array.name, () => {
    const v = array()
    expect(v(['hi'])).toHaveLength(0)
    expect(v({})).toHaveLength(1)
    expect(v('cat')).toHaveLength(1)
    expect(v(null)).toHaveLength(1)
    expect(v(undefined)).toHaveLength(1)
  })
  it(optional.name, () => {
    const v = optional(string())
    expect(v('foo')).toHaveLength(0)
    expect(v(null)).toHaveLength(0)
    expect(v(undefined)).toHaveLength(0)
    expect(v(1)).toHaveLength(1)
    expect(v([])).toHaveLength(1)
    expect(v({})).toHaveLength(1)
  })
  it(itemsOf.name, () => {
    const v = array(itemsOf(string()))
    expect(v([])).toHaveLength(0)
    expect(v(['a'])).toHaveLength(0)
    expect(v(['a', 'b'])).toHaveLength(0)

    expect(v([false])).toHaveLength(1)
    expect(v(['a', 1])).toHaveLength(1)
    expect(v(['a', true, {}])).toHaveLength(2)
  })
  describe(fields.name, () => {
    const f = {
      cat: string(),
      foo: number(),
      mayhaps: optional(boolean()),
    }

    it('should validate fields', () => {
      const v = object(fields(f))
      expect(v({ cat: '', foo: 1 })).toHaveLength(0)
      expect(v({ cat: '', foo: 1, mayhaps: false })).toHaveLength(0)
      expect(v({ cat: '', foo: 1, mayhaps: false, extra: 'foo' })).toHaveLength(0)

      expect(v({ cat: '', foo: 1, mayhaps: 'yes' })).toHaveLength(1)
      expect(v({ cat: '', mayhaps: 'yes' })).toHaveLength(2)
      expect(v({})).toHaveLength(2)
    })

    it('should not allow extra fields', () => {
      const v = object(fields(f))
      expect(v({ cat: '', foo: 1, cat2: false })).toHaveLength(1)
      expect(v({ cat: '', foo: 1, mayhaps: false, extra: 'foo' })).toHaveLength(1)
      expect(v({ cat: '', foo: 1, extra: 'foo', cat2: false })).toHaveLength(2)
    })
  })
})
