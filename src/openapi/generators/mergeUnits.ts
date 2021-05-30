import {
  factory,
  ImportClause,
  ImportDeclaration,
  NamedImportBindings,
  NamedImports,
  StringLiteral,
  SyntaxKind,
} from 'typescript'
import { flatMap, groupBy, head, uniqueBy } from '../../utils'
import { TypeScriptUnit } from '../types/TypeScriptUnit'

function mergeNamedImports(bindings: NamedImportBindings[]): NamedImports {
  return factory.createNamedImports(
    flatMap(
      bindings.filter(({ kind }) => kind === SyntaxKind.NamedImports),
      (imp: NamedImports) => uniqueBy(Array.from(imp.elements), (impSpec) => impSpec.name.text),
    ),
  )
}

function mergeImportClauses(imps: ImportClause[]): ImportClause {
  return factory.createImportClause(false, undefined, mergeNamedImports(imps.map((imp) => imp.namedBindings)))
}

function mergeImports(imps: ImportDeclaration[]): ImportDeclaration[] {
  return Array.from(groupBy(imps, (imp) => (imp.moduleSpecifier as StringLiteral).text).values()).map((imps) =>
    factory.createImportDeclaration(
      [],
      [],
      mergeImportClauses(imps.map((imp) => imp.importClause)),
      head(imps).moduleSpecifier,
    ),
  )
}

export function mergeUnits(units: TypeScriptUnit[]): TypeScriptUnit[] {
  return Array.from(groupBy(units, (unit) => unit.path).values()).map(
    (units): TypeScriptUnit => ({
      content: flatMap(units, (unit) => unit.content),
      imports: mergeImports(flatMap(units, (unit) => unit.imports)),
      path: head(units).path,
    }),
  )
}
