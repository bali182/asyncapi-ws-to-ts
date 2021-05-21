import { isNil } from '../utils'
import { ModelType, Ref } from './types'

export function ref<T>(uri: string, values: Map<string, T>): Ref<T> {
  return {
    __type: ModelType.Ref,
    uri,
    value: () => {
      const target = values.get(uri)
      if (isNil(target)) {
        console.error(`Couldn't find ${uri}.`)
        console.log(Array.from(values.keys()))
      }
      return target
    },
  }
}

export const noRef: Ref<any> = {
  __type: ModelType.Ref,
  uri: null,
  value: () => null,
}