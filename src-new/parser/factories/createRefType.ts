import { ReferenceObject } from '../../schema'
import { $RefType, ModelType } from '../../types'
import { FactoryContext } from './FactoryContext'

export async function create$RefType(name: string, schema: ReferenceObject, context: FactoryContext): Promise<string> {
  const uri = 'TODO'
  const refType: $RefType = {
    __type: ModelType.$RefType,
    ref: schema.$ref,
    uri,
    name,
  }

  context.types.push(refType)
  return uri
}
