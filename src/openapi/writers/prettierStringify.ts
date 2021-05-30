import prettier, { Options } from 'prettier'
import { TypeScriptUnit } from '../types/TypeScriptUnit'
import { defaultStringify } from './defaultStringify'

export const prettierStringify = (options: Options = {}) => async (data: TypeScriptUnit): Promise<string> => {
  return prettier.format(await defaultStringify(data), options)
}
