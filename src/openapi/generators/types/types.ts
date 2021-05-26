import { isNil } from '../../../utils'
import { crateGeneratorConfig } from '../../defaults'
import { OpenAPIGeneratorConfig, TsGeneratorOutput, OpenAPIGeneratorContext } from '../../generatorTypes'
import { OpenAPIReadModel } from '../../readTypes'
import { mergeUnits } from '../mergeUnits'
import { generateType } from './generateType'

export const types = (config: Partial<OpenAPIGeneratorConfig> = {}) => async (
  model: OpenAPIReadModel,
): Promise<TsGeneratorOutput> => {
  const context: OpenAPIGeneratorContext = { model, config: crateGeneratorConfig(config) }
  const namedTypes = Array.from(model.types.values()).filter((type) => !isNil(type.name))
  return mergeUnits(namedTypes.map((type) => generateType(type, context)))
}
