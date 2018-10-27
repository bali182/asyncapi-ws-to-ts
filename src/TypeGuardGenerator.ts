import entries from 'lodash/entries'
import { isEnumType, isObjectType, isArrayType, isOneOfType, isAllOfType, isAnyOfType, isRefType } from './utils'
import { BaseGenerator } from './BaseGenerator'
import { TypeRegistry } from './TypeRegistry'
import { TypeRefGenerator } from './TypeRefGenerator'

export class TypeGuardGenerator extends BaseGenerator<string> {
  private readonly typeRefGenerator: TypeRefGenerator
  constructor(registry: TypeRegistry) {
    super(registry)
    this.typeRefGenerator = new TypeRefGenerator(registry)
  }
  generate(name: string): string {
    // const schema = this.registry.getSchemaByName(name)
    return `export function is${name}(input: any): input is ${name} {
      return false // TODO
    }`
  }
}
