import { fields, object, string } from '../../../validation/Validators'

export const referenceObject = object(fields({ $ref: string() }))
