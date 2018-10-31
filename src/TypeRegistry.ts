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
  isSchemaType,
} from './utils'
import { TypeWrapper } from './TypeWrapper'
import { NameProvider } from './NameProvider'
import { AsyncApiSpec, SchemaObject, ReferenceObject } from './AyncApiTypings'
import { MessageWrapper, MessageType } from './MessageWrapper'
import { Options, GeneratorTarget } from './typings'

export class TypeRegistry {
  private readonly types: TypeWrapper[] = []
  private readonly messages: MessageWrapper[] = []
  private readonly spec: AsyncApiSpec
  private readonly nameProvider: NameProvider
  public readonly options: Options
  constructor(spec: AsyncApiSpec, options: Options, nameProvider: NameProvider) {
    this.spec = spec
    this.nameProvider = nameProvider
    this.options = options
    this.registerTypes()
    this.registerMessages()
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
  getSchemaWrapperForSchema(schema: SchemaObject): TypeWrapper {
    return this.types.find(({ schema: s }) => s === schema)
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
  getReceiveMessages(): MessageWrapper[] {
    return this.options.target === GeneratorTarget.CLIENT
      ? this.messages.filter(({ type }) => type === MessageType.RECEIVE)
      : this.messages.filter(({ type }) => type === MessageType.SEND)
  }
  getSendMessages(): MessageWrapper[] {
    return this.options.target === GeneratorTarget.CLIENT
      ? this.messages.filter(({ type }) => type === MessageType.SEND)
      : this.messages.filter(({ type }) => type === MessageType.RECEIVE)
  }
  getMessages(): MessageWrapper[] {
    return this.messages
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
        if (isSchemaType(subSchema) && isEnumType(subSchema) && subSchema.enum.length === 1) {
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
      this.registerTypeRecursively(this.nameProvider.getPayloadTypeName(name), message.payload, true)
    }
  }
  protected registerMessages() {
    this.spec.events.receive.forEach((message) =>
      this.messages.push(new MessageWrapper(this.spec, MessageType.RECEIVE, message)),
    )
    this.spec.events.send.forEach((message) =>
      this.messages.push(new MessageWrapper(this.spec, MessageType.SEND, message)),
    )
  }
}
