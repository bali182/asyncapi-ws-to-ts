export enum ModelType {
  AnyType = 'AnyType',
  ArrayType = 'ArrayType',
  TypedObjectType = 'TypedObjectType',
  DictionaryType = 'DictionaryType',
  StringType = 'StringType',
  NumberType = 'NumberType',
  BooleanType = 'BooleanType',
  EnumType = 'EnumType',
  UnionType = 'UnionType',
  IntersectionType = 'IntersectionType',

  TypedObjectTypeField = 'TypedObjectTypeField',
  EnumValue = 'EnumValue',

  $RefType = '$RefType',
}

export enum NumberFormat {
  Integer = 'integer',
  Float = 'float',
}

export enum StringFormat {
  DateTime = 'date-time',
  Date = 'date',
  Time = 'time',
  Email = 'email',
  IdnEmail = 'idn-email',
  Hostname = 'hostname',
  IdnHostname = 'idn-hostname',
  Ipv4 = 'ipv4',
  Ipv6 = 'ipv6',
  Uri = 'uri',
  UriReference = 'uri-reference',
  Iri = 'iri',
  IriReference = 'iri-reference',
  UriTemplate = 'uri-template',
  JsonPointer = 'json-pointer',
  RelativeJsonPointer = 'relative-json-pointer',
  Regex = 'regex',
}

export type Type = ObjectType | ArrayType | PrimitiveType | CompositeType | $RefType
export type ObjectType = TypedObjectType | DictionaryType
export type CompositeType = UnionType | IntersectionType
export type PrimitiveType = NumberType | StringType | BooleanType | EnumType

type BaseModel = {
  __type: ModelType
  uri: string
  name: string
  description?: string
  deprecated?: boolean
}

export type AnyType = BaseModel & {
  __type: ModelType.AnyType
}
export type $RefType = BaseModel & {
  __type: ModelType.$RefType
  ref: string
}

export type TypedObjectTypeField = BaseModel & {
  __type: ModelType.TypedObjectTypeField
  type: Type
  isRequired: boolean
  __typeRef?: string
}

export type TypedObjectType = BaseModel & {
  __type: ModelType.TypedObjectType
  fields: TypedObjectTypeField[]
}

export type ArrayType = BaseModel & {
  __type: ModelType.ArrayType
  itemType: Type
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  __itemTypeRef?: string
}

export type DictionaryType = BaseModel & {
  __type: ModelType.DictionaryType
  valueType: Type
  __valueTypeRef?: string
}

export type StringType = BaseModel & {
  __type: ModelType.StringType
  format?: StringFormat
  pattern?: string
  maxLength?: number
  minLength?: number
}

export type NumberType = BaseModel & {
  __type: ModelType.NumberType
  format?: NumberFormat
  multipleOf?: number
  maximum?: number
  minimum?: number
  exclusiveMaximum?: boolean
  exclusiveMinimum?: boolean
}

export type BooleanType = BaseModel & {
  __type: ModelType.BooleanType
}

export type EnumType = BaseModel & {
  __type: ModelType.EnumType
  values: EnumValue[]
}

export type EnumValue = BaseModel & {
  __type: ModelType.EnumValue
  value: string | number | boolean
}

export type UnionType = BaseModel & {
  __type: ModelType.UnionType
  types: TypedObjectType[]
  __typesRefs?: string[]
}

export type IntersectionType = BaseModel & {
  __type: ModelType.IntersectionType
  types: TypedObjectType[]
  __typesRefs?: string[]
}
