import { OpenAPIObject } from 'openapi3-ts'
import { array, fields, object, optional, string } from '../../../validation/Validators'

export const openApiObject = object(
  fields<OpenAPIObject>({
    openapi: string(),
    info: optional(object()),
    servers: optional(array()),
    paths: optional(object()),
    components: optional(object()),
    security: optional(array()),
    tags: optional(array()),
    externalDocs: optional(object()),
  }),
)
