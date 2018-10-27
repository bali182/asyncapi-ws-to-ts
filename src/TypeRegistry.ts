import entries from 'lodash/entries'
import {
  isObjectType,
  isEnumType,
  isArrayType,
  isOneOfType,
  isAllOfType,
  isAnyOfType,
  isPureMapType,
  isRefType,
} from './utils'
import { TypeWrapper } from './TypeWrapper'
import { NameProvider } from './NameProvider'
import { AsyncApiSpec, SchemaObject } from './OpenApiTypings'

export class TypeRegistry {
  private readonly types: TypeWrapper[] = []
  private readonly spec: AsyncApiSpec
  private readonly nameProvider: NameProvider
  constructor(spec: AsyncApiSpec, nameProvider: NameProvider) {
    this.spec = spec
    this.nameProvider = nameProvider
    this.registerTypes()
  }
  getNameProvider(): NameProvider {
    return this.nameProvider
  }
  getSpec(): AsyncApiSpec {
    return this.spec
  }
  getTypes(): TypeWrapper[] {
    return this.types
  }
  getTypeNames(): string[] {
    return this.types.map(({ name }) => name)
  }
  hasSchemaName(name: string): boolean {
    return this.types.find(({ name: n }) => n === name) !== undefined
  }
  hasSchema(schema: SchemaObject): boolean {
    return this.types.find(({ schema: s }) => s === schema) !== undefined
  }
  getSchemaByName(name: string): SchemaObject {
    const wrapper = this.types.find(({ name: n }) => n === name)
    if (wrapper === undefined) {
      throw new TypeError(`Type "${name}" is not registered!`)
    }
    return wrapper.schema
  }
  getNameBySchema(schema: SchemaObject): string {
    const wrapper = this.types.find(({ schema: s }) => s === schema)
    if (wrapper === undefined) {
      throw new TypeError(`Type for schema "${JSON.stringify(schema, null, 2)}" is not registered!`)
    }
    return wrapper.name
  }
  protected registerType(name: string, schema: SchemaObject): void {
    const byName = this.types.find(({ name: n }) => n === name)
    if (byName !== undefined) {
      throw new TypeError(`Type "${name}" is already registered!`)
    }
    const bySchema = this.types.find(({ schema: s }) => s === schema)
    if (bySchema !== undefined) {
      throw new TypeError(`Type for schema "${JSON.stringify(schema, null, 2)}" is already registered!`)
    }
    this.types.push({ name, schema })
  }
  protected registerTypeRecursively(name: string, schema: SchemaObject, force: boolean) {
    if ((force || (isObjectType(schema) && !isPureMapType(schema)) || isEnumType(schema)) && !this.hasSchema(schema)) {
      this.registerType(this.nameProvider.getTypeName(name), schema)
    }

    if (isObjectType(schema) && schema.properties) {
      for (const [fieldName, subSchema] of entries(schema.properties)) {
        if (fieldName === 'type' && isEnumType(subSchema) && (subSchema as SchemaObject).enum.length === 1) {
          continue
        }
        this.registerTypeRecursively(this.nameProvider.getNestedTypeName(name, fieldName), subSchema, false)
      }
    }
    if (isArrayType(schema) && schema.items) {
      this.registerTypeRecursively(this.nameProvider.getNestedItemName(name), schema.items, false)
    }
    if (isOneOfType(schema)) {
      schema.oneOf.forEach((child, index) =>
        this.registerTypeRecursively(this.nameProvider.getNestedOneOfName(name, index), child, false),
      )
    }
    if (isAllOfType(schema) && !schema.allOf.every(isRefType)) {
      schema.allOf.forEach((child, index) =>
        this.registerTypeRecursively(this.nameProvider.getNestedAllOfName(name, index), child, false),
      )
    }
    if (isAnyOfType(schema)) {
      schema.anyOf.forEach((child, index) =>
        this.registerTypeRecursively(this.nameProvider.getNestedAnyOfName(name, index), child, false),
      )
    }
  }
  protected registerTypes(): void {
    for (const [name, schema] of entries(this.spec.components.schemas)) {
      this.registerTypeRecursively(name, schema, true)
    }
    for (const [name, message] of entries(this.spec.components.messages)) {
      if (!isRefType(message)) {
        this.registerTypeRecursively(this.nameProvider.getPayloadTypeName(name), message.payload, true)
      }
    }
  }
}
