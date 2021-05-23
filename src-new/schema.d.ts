export type OpenAPIObject = {
  openapi: string
  servers?: ServerObject[]
  paths?: PathsObject
  components?: ComponentsObject
  security?: SecurityRequirementObject[]
}

export type EncodingObject = {
  [property: string]: EncodingPropertyObject | any
}

export type EncodingPropertyObject = {
  contentType?: string
  headers?: {
    [key: string]: HeaderObject | ReferenceObject
  }
  style?: string
  explode?: boolean
  allowReserved?: boolean
  [key: string]: any
}

export type HeaderObject = BaseParameterObject

export type ParameterLocation = 'query' | 'header' | 'path' | 'cookie'

export type ParameterStyle = 'matrix' | 'label' | 'form' | 'simple' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'

export type ContentObject = {
  [mediatype: string]: MediaTypeObject
}

export type OperationResponsesObject = {
  default?: ResponseObject | ReferenceObject
  [statuscode: string]: ResponseObject | ReferenceObject | any
}

export type ResponseObject = {
  description: string
  headers?: HeadersObject
  content?: ContentObject
}

export type LinksObject = {
  [name: string]: LinkObject | ReferenceObject
}

export type LinkParametersObject = {
  [name: string]: any | string
}

export type LinkObject = {
  operationRef?: string
  operationId?: string
  parameters?: LinkParametersObject
  requestBody?: any | string
  description?: string
  server?: ServerObject
  [property: string]: any
}

export type HeadersObject = {
  [name: string]: HeaderObject | ReferenceObject
}

export type MediaTypeObject = {
  schema?: SchemaObject | ReferenceObject
  encoding?: EncodingObject
}

export type BaseParameterObject = {
  description?: string
  required?: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
  style?: ParameterStyle
  explode?: boolean
  allowReserved?: boolean
  schema?: SchemaObject | ReferenceObject
  content?: ContentObject
}

export type RequestBodyObject = {
  description?: string
  content: ContentObject
  required?: boolean
}

export type ParameterObject = BaseParameterObject & {
  name: string
  in: ParameterLocation
}

export type PathItemObject = {
  $ref?: string
  summary?: string
  description?: string
  get?: OperationObject
  put?: OperationObject
  post?: OperationObject
  delete?: OperationObject
  options?: OperationObject
  head?: OperationObject
  patch?: OperationObject
  trace?: OperationObject
  servers?: ServerObject[]
  parameters?: (ParameterObject | ReferenceObject)[]
}

export type OperationObject = {
  tags?: string[]
  summary?: string
  description?: string
  operationId?: string
  parameters?: (ParameterObject | ReferenceObject)[]
  requestBody?: RequestBodyObject | ReferenceObject
  responses: OperationResponsesObject
  callbacks?: CallbacksObject
  deprecated?: boolean
  security?: SecurityRequirementObject[]
  servers?: ServerObject[]
}

export type SecurityRequirementObject = {
  [name: string]: string[]
}

export type PathsObject = {
  [path: string]: PathItemObject | any
}

export type SchemasObject = {
  [schema: string]: SchemaObject | ReferenceObject
}

export type ParametersObject = {
  [parameter: string]: ParameterObject | ReferenceObject
}

export type RequestBodiesObject = {
  [request: string]: RequestBodyObject | ReferenceObject
}

export type ResponsesObject = {
  [request: string]: ResponseObject | ReferenceObject
}

export type ComponentsObject = {
  schemas?: SchemasObject
  parameters?: ParametersObject
  headers?: HeadersObject
  responses?: ResponsesObject
  requestBodies?: RequestBodiesObject

  securitySchemes?: {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject
  }
  links?: {
    [link: string]: LinkObject | ReferenceObject
  }
  callbacks?: {
    [callback: string]: CallbackObject | ReferenceObject
  }
}

export declare type SecuritySchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect'

export type SecuritySchemeObject = {
  type: SecuritySchemeType
  description?: string
  name?: string
  in?: string
  scheme?: string
  bearerFormat?: string
  flows?: OAuthFlowsObject
  openIdConnectUrl?: string
}

export type OAuthFlowsObject = {
  implicit?: OAuthFlowObject
  password?: OAuthFlowObject
  clientCredentials?: OAuthFlowObject
  authorizationCode?: OAuthFlowObject
}

export type OAuthFlowObject = {
  authorizationUrl?: string
  tokenUrl?: string
  refreshUrl?: string
  scopes: ScopesObject
}

export type ScopesObject = {
  [scope: string]: any
}

export type CallbacksObject = {
  [name: string]: CallbackObject | ReferenceObject | any
}

export type CallbackObject = {
  [name: string]: PathItemObject | any
}

export type ServerVariableObject = {
  enum?: string[] | boolean[] | number[]
  default: string | boolean | number
  description?: string
}

export type ServerObject = {
  url: string
  description?: string
  variables?: {
    [v: string]: ServerVariableObject
  }
}

type StringKeyedMap<T> = {
  [key: string]: T
}

export type SchemaOrReferenceObject = SchemasObject | ReferenceObject

export type ReferenceObject = {
  $ref: string
}

export type DiscriminatorObject = {
  propertyName: string
  mapping?: {
    [key: string]: string
  }
}

export type SchemaObject = {
  nullable?: boolean
  discriminator?: DiscriminatorObject
  readOnly?: boolean
  writeOnly?: boolean
  example?: any
  examples?: any[]
  deprecated?: boolean
  type?: 'number' | 'int' | 'integer' | 'float' | 'boolean' | 'string' | 'object' | 'array'
  allOf?: (SchemaObject | ReferenceObject)[]
  oneOf?: (SchemaObject | ReferenceObject)[]
  anyOf?: (SchemaObject | ReferenceObject)[]
  not?: SchemaObject | ReferenceObject
  items?: SchemaObject | ReferenceObject
  properties?: StringKeyedMap<SchemaObject | ReferenceObject>
  additionalProperties?: SchemaObject | ReferenceObject
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
  enum?: (string | number | boolean)[]

  [extensionName: string]: any
}
