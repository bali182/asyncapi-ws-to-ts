import { MediaTypeObject } from 'openapi3-ts'
import { fields, object, optional } from '../../../validation/Validators'

export const mediaTypeObject = object(
  fields<MediaTypeObject>({
    schema: optional(object()),
    examples: optional(object()),
    example: optional(object()),
    encoding: optional(object()),
  }),
)
