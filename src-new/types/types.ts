export enum ModelType {
  AnyType = 'AnyType',
  ArrayType = 'ArrayType',
  ObjectType = 'ObjectType',
  DictionaryType = 'DictionaryType',
  StringType = 'StringType',
  NumberType = 'NumberType',
  BooleanType = 'BooleanType',
  EnumType = 'EnumType',
  UnionType = 'UnionType',
  IntersectionType = 'IntersectionType',

  ObjectField = 'ObjectField',
  DiscriminatorField = 'DiscriminatorField',
  EnumValue = 'EnumValue',

  Ref = 'Ref',

  OperationType = 'OperationType',
  ResponseType = 'ResponseType',
  RequestBodyType = 'RequestBodyType',
  ParameterType = 'ParameterType',

  QueryParameterType = 'QueryParameterType',
  HeaderParameterType = 'HeaderParameterType',
  PathParameterType = 'PathParameterType',
  CookieParameterType = 'PathParameterType',
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

export enum HttpMethod {
  Get = 'get',
  Put = 'put',
  Post = 'post',
  Delete = 'delete',
  Options = 'options',
  Head = 'head',
  Patch = 'patch',
  Trace = 'trace',
}

export enum ParameterStyle {
  // Path
  Simple = 'simple',
  DotPrefixed = 'label',
  SemicolonPrefixed = 'matrix',

  // Query
  Form = 'form',
  SpaceDelimited = 'spaceDelimited',
  PipeDelimited = 'pipeDelimited',
  DeepObject = 'deepObject',
}

export type Type =
  | AnyType
  | ObjectType
  | DictionaryType
  | ArrayType
  | NumberType
  | StringType
  | BooleanType
  | EnumType
  | UnionType
  | IntersectionType

type HasUri = {
  uri?: string
}

type HasName = {
  name?: string
}

type HasDescription = {
  description?: string
}

type HasDeprecation = {
  deprecated?: boolean
}

type CommonType = HasUri & HasName & HasDescription & HasDeprecation

export type AnyType = CommonType & {
  __type: ModelType.AnyType
}
export type Ref<T> = HasUri & {
  __type: ModelType.Ref
  get(): T
  isResolved(): boolean
}

export type ObjectField = HasName &
  HasUri & {
    __type: ModelType.ObjectField
    type?: Ref<Type>
    isRequired: boolean
  }

export type DiscriminatorField = HasName & {
  __type: ModelType.DiscriminatorField
  value: string
}

export type ObjectType = CommonType & {
  __type: ModelType.ObjectType
  fields: ObjectField[]
  discriminators: DiscriminatorField[]
}

export type ArrayType = CommonType & {
  __type: ModelType.ArrayType
  itemType: Ref<Type>
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
}

export type DictionaryType = CommonType & {
  __type: ModelType.DictionaryType
  valueType: Ref<Type>
}

export type StringType = CommonType & {
  __type: ModelType.StringType
  format?: StringFormat
  pattern?: string
  maxLength?: number
  minLength?: number
}

export type NumberType = CommonType & {
  __type: ModelType.NumberType
  format?: NumberFormat
  multipleOf?: number
  maximum?: number
  minimum?: number
  exclusiveMaximum?: boolean
  exclusiveMinimum?: boolean
}

export type BooleanType = CommonType & {
  __type: ModelType.BooleanType
}

export type EnumType = CommonType & {
  __type: ModelType.EnumType
  values: EnumValue[]
}

export type EnumValue = CommonType & {
  __type: ModelType.EnumValue
  value: string | number | boolean
}

export type UnionType = CommonType & {
  __type: ModelType.UnionType
  property?: string
  types: Map<Ref<Type>, string>
}

export type IntersectionType = CommonType & {
  __type: ModelType.IntersectionType
  types: Ref<Type>[]
}

export type OperationType = HasUri &
  HasDescription &
  HasDeprecation & {
    __type: ModelType.OperationType
    operationId: string
    method: HttpMethod
    parameters: Ref<ParameterType>[]
    url: string
    requestBody: Ref<RequestBodyType>
    responses: Ref<ResponseType>[]
  }

export type RequestBodyType = HasUri & {
  __type: ModelType.RequestBodyType
}

export type ResponseType = HasUri & {
  __type: ModelType.ResponseType
  statusCode: number
  contentType: string
  headers: Ref<HeaderParameterType>[]
  type: Ref<Type>
}

export type _ParameterType<T extends ModelType, S extends ParameterStyle> = HasDescription &
  HasDeprecation & {
    __type: T
    name: string
    urlEncode: boolean // allowReserved
    style: S
    explode: boolean
    allowEmptyValue: boolean
    type: Ref<Type>
  }

export type QueryParameterStyle =
  | ParameterStyle.Form
  | ParameterStyle.SpaceDelimited
  | ParameterStyle.PipeDelimited
  | ParameterStyle.DeepObject
export type QueryParameterType = _ParameterType<ModelType.QueryParameterType, QueryParameterStyle>

export type HeaderParameterStyle = ParameterStyle.Simple
export type HeaderParameterType = _ParameterType<ModelType.HeaderParameterType, HeaderParameterStyle>

export type PathParameterStyle = ParameterStyle.Simple | ParameterStyle.DotPrefixed | ParameterStyle.SemicolonPrefixed
export type PathParameterType = _ParameterType<ModelType.PathParameterType, PathParameterStyle>

export type CookieParameterStyle = ParameterStyle.Form
export type CookieParameterType = _ParameterType<ModelType.CookieParameterType, CookieParameterStyle>

export type ParameterType = HeaderParameterType | CookieParameterType | PathParameterType | QueryParameterType
