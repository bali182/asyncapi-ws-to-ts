import { DiscriminatorObject } from 'openapi3-ts'
import { fields, object, optional, string } from '../../../validation/Validators'

export const discriminatorObject = object(
  fields<DiscriminatorObject>({
    mapping: optional(object()),
    propertyName: string(),
  }),
)
