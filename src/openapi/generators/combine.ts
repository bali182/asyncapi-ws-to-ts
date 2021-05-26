import { Generator } from '../../typings'
import { TsGeneratorOutput, TsUnit } from '../generatorTypes'
import { OpenAPIReadModel } from '../readTypes'
import { mergeUnits } from './mergeUnits'

export const combine = (
  ...generators: Generator<OpenAPIReadModel, TsGeneratorOutput>[]
): Generator<OpenAPIReadModel, TsGeneratorOutput> => async (data: OpenAPIReadModel): Promise<TsGeneratorOutput> => {
  const units: TsUnit[] = []
  for (const generator of generators) {
    units.push(...(await generator(data)))
  }
  return mergeUnits(units)
}