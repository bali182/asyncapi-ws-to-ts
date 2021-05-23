import { createContext, FactoryContext, FactoryInput, OpenAPIConfig, OpenAPIModel } from '../FactoryContext'
import { OpenAPIObject, ReferenceObject, SchemaObject } from '../schema'
import { entries } from '../utils'
import { createDiscriminatorFields } from './createDiscriminatorFields'
import { createType } from './createType'
import { ModelType, UnionType } from './types'

export function createOpenAPIModel(uri: string, openAPIModel: OpenAPIObject, config: OpenAPIConfig): FactoryContext {
  const { components, paths } = openAPIModel
  const { headers, parameters, requestBodies, responses, schemas } = components
  const context = createContext({ config })

  // Build schemas
  for (const [name, data] of entries<SchemaObject | ReferenceObject>(schemas)) {
    const input: FactoryInput<SchemaObject | ReferenceObject> = {
      name,
      data,
      uri: context.config.path.append(uri, 'components', 'schemas', name),
    }
    createType(input, context)
  }

  const unionTypes = Array.from(context.model.types.values()).filter(
    (type) => type.__type === ModelType.UnionType,
  ) as UnionType[]

  for (const unionType of unionTypes) {
    createDiscriminatorFields(unionType)
  }

  return context
}
