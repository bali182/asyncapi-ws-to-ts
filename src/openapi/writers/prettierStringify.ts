import { TsUnit } from '../generatorTypes'
import prettier, { Options } from 'prettier'
import { defaultStringify } from './defaultStringify'

export const prettierStringify = (options: Options = {}) => async (data: TsUnit): Promise<string> => {
  return prettier.format(await defaultStringify(data), options)
}
