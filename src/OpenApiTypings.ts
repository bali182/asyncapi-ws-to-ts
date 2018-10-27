interface StringKeyedMap<T> {
  [key: string]: T
}
export interface ReferenceObject {
  $ref: string
}
export interface ISpecificationExtension {
  [extensionName: string]: any
}
export interface DiscriminatorObject {
  propertyName: string
  mapping?: {
    [key: string]: string
  }
}
export interface ExternalDocumentationObject extends ISpecificationExtension {
  description?: string
  url: string
}
export interface SchemaObject extends ISpecificationExtension {
  nullable?: boolean
  discriminator?: DiscriminatorObject
  readOnly?: boolean
  writeOnly?: boolean
  externalDocs?: ExternalDocumentationObject
  example?: any
  examples?: any[]
  deprecated?: boolean
  type?: string
  allOf?: (SchemaObject | ReferenceObject)[]
  oneOf?: (SchemaObject | ReferenceObject)[]
  anyOf?: (SchemaObject | ReferenceObject)[]
  not?: SchemaObject | ReferenceObject
  items?: SchemaObject | ReferenceObject
  properties?: StringKeyedMap<SchemaObject | ReferenceObject>
  additionalProperties?: SchemaObject | ReferenceObject | boolean
  description?: string
  format?: string
  default?: any
  title?: string
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: boolean
  minimum?: number
  exclusiveMinimum?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: string[]
  enum?: any[]
}
export interface InfoObject {
  title: string
  version: string
}
export interface ServerObject {
  url: string
  scheme: string
  schemeVersion: string
}
export interface TagObject {
  name: string
  externalDocs: ExternalDocumentationObject
  description: string
}
export interface MessageObject {
  headers?: SchemaObject | ReferenceObject
  summary?: string
  description?: string
  payload: SchemaObject | ReferenceObject
  tags?: TagObject[]
}
export interface EventsObject {
  send?: (MessageObject | ReferenceObject)[]
  receive?: (MessageObject | ReferenceObject)[]
}
export interface ComponentsObject {
  schemas?: StringKeyedMap<SchemaObject>
  messages?: StringKeyedMap<MessageObject | ReferenceObject>
  securitySchemes?: any // TODO
}
export interface AsyncApiSpec {
  asyncapi?: string
  info?: InfoObject
  servers?: ServerObject[]
  security?: any // TODO
  events?: EventsObject
  components: ComponentsObject
}
