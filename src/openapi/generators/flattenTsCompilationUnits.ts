import { ImportDeclaration } from 'typescript'
import { flatMap, head } from '../../utils'
import { TsUnit } from '../generatorTypes'

function flattenImports(imports: ImportDeclaration[]): ImportDeclaration[] {
  return imports
}

export function flattenTsCompilationUnits(units: TsUnit[]): TsUnit[] {
  const mapping = units.reduce(
    (map, unit) => map.set(unit.path, map.has(unit.path) ? map.get(unit.path).concat(unit) : [unit]),
    new Map<string, TsUnit[]>(),
  )

  return Array.from(mapping.values()).map(
    (units): TsUnit => ({
      content: flatMap(units, (unit) => unit.content),
      imports: flattenImports(flatMap(units, (unit) => unit.imports)),
      path: head(units).path,
    }),
  )
}
