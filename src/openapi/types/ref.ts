import { isNil } from '../../utils'
import { ModelType, Ref } from './types'

export function ref<T>(uri: string, values: Map<string, T>): Ref<T> {
  const get = () => values.get(uri)
  const isResolved = () => !isNil(get())
  return {
    __type: ModelType.Ref,
    uri,
    get,
    isResolved,
  }
}

export const noRef: Ref<any> = {
  __type: ModelType.Ref,
  uri: null,
  get: () => null,
  isResolved: () => false,
}
