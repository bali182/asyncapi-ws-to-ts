import entries from 'lodash/entries'
import {
  isEnumType,
  isObjectType,
  isArrayType,
  isOneOfType,
  isAllOfType,
  isAnyOfType,
  isRefType,
  isSchemaType,
} from './utils'
import { BaseGenerator } from './BaseGenerator'
import { TypeRegistry } from './TypeRegistry'
import { TypeRefGenerator } from './TypeRefGenerator'
import { SchemaObject } from './OpenApiTypings'

export class TypeGuardGenerator extends BaseGenerator<string> {
  private readonly typeRefGenerator: TypeRefGenerator
  constructor(registry: TypeRegistry) {
    super(registry)
    this.typeRefGenerator = new TypeRefGenerator(registry)
  }
  generateBody(schema: SchemaObject): string {
    if (isObjectType(schema) && this.isIdentifiedByType(schema)) {
      return this.generateTypeIdentifiedObjectBody(schema)
    }
    return `return false // TODO`
  }
  generateTypeIdentifiedObjectBody(schema: SchemaObject): string {
    const type = schema.properties.type as SchemaObject
    return `return input instanceof Object && input.type === '${type.enum[0]}'`
  }
  isIdentifiedByType(schema: SchemaObject): boolean {
    if (!schema.properties || !schema.properties.type) {
      return false
    }
    const type = schema.properties.type
    return isSchemaType(type) && isEnumType(type) && type.enum.length === 1
  }
  generate(name: string): string {
    const schema = this.registry.getSchemaByName(name)
    return `export function is${name}(input: any): input is ${name} {
      ${this.generateBody(schema)}
    }`
  }
}
