import entries from 'lodash/entries'
import isVarName from 'is-var-name'
import { isEnumType, isObjectType, isRefType, isSchemaType } from './utils'
import { BaseGenerator } from './BaseGenerator'
import { TypeRegistry } from './TypeRegistry'
import { TypeRefGenerator } from './TypeRefGenerator'
import { SchemaObject } from './AyncApiTypings'
import { TypeWrapper } from './TypeWrapper'

export class TypeGuardGenerator extends BaseGenerator<TypeWrapper> {
  private readonly typeRefGenerator: TypeRefGenerator
  constructor(registry: TypeRegistry) {
    super(registry)
    this.typeRefGenerator = new TypeRefGenerator(registry)
  }
  generateBody(schema: SchemaObject): string {
    if (isObjectType(schema)) {
      return this.generateObjectTypeGuard(schema)
    }
    return `return false // TODO`
  }
  getConstantEnumFieldNames(schema: SchemaObject): string[] {
    return entries(schema.properties)
      .filter(([, field]) => isSchemaType(field) && isEnumType(field) && field.enum.length === 1)
      .map(([name]) => name)
  }
  generateObjectTypeGuard(schema: SchemaObject): string {
    const constEnumFields = this.getConstantEnumFieldNames(schema)
    const nonConstEnumFields = entries(schema.properties)
      .map(([name]) => name)
      .filter((name) => constEnumFields.indexOf(name) < 0)
    const constEnumFieldChecks = constEnumFields.map((name) => {
      const type = schema.properties[name] as SchemaObject
      const varName = isVarName(name) ? `input.${name}` : `input['${name}']`
      return `${varName} === '${type.enum[0]}'`
    })
    const nonConstEnumFieldChecks = nonConstEnumFields
      .map((name) => {
        const type = schema.properties[name]
        if (isRefType(type) || (isSchemaType(type) && !type.required)) {
          return null
        }
        const varName = isVarName(name) ? `input.${name}` : `input['${name}']`
        return `${varName} !== undefined` // TODO
      })
      .filter((check) => check !== null)
    const constFieldChecksStr = constEnumFieldChecks.length > 0 ? ` && ${constEnumFieldChecks.join('&&')}` : ''
    const nonConstFieldChecksStr = nonConstEnumFieldChecks.length > 0 ? ` && ${nonConstEnumFieldChecks.join('&&')}` : ''
    return `return input instanceof Object${constFieldChecksStr}${nonConstFieldChecksStr}`
  }
  generate(t: TypeWrapper): string {
    return `export function is${t.name}(input: any): input is ${t.name} {
      ${this.generateBody(t.schema)}
    }`
  }
}
