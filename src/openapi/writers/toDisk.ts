// import { TsGeneratorOutput, TsUnit } from '../generatorTypes'
// import { TsWriterConfig } from '../writerTypes'

// export const toDisk = (config: Partial<TsWriterConfig> = {}) => async (data: TsGeneratorOutput) => {
//   const { stringify, write } = createWriterConfig(config)
//   const stringifiedData = await Promise.all(
//     data.map((unit) => stringify(unit).then((result): [TsUnit, string] => [unit, result])),
//   )
//   await Promise.all(stringifiedData.map(([{ path }, content]) => write(path, content)))
// }
