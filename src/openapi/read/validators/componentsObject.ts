import { ComponentsObject } from 'openapi3-ts'
import { fields, object, optional } from '../../../validation/Validators'

export const componentsObject = object(
  fields<ComponentsObject>({
    schemas: optional(object()),
    responses: optional(object()),
    parameters: optional(object()),
    examples: optional(object()),
    requestBodies: optional(object()),
    headers: optional(object()),
    securitySchemes: optional(object()),
    links: optional(object()),
    callbacks: optional(object()),
  }),
)
