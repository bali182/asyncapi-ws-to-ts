import { dictionaryOf, object } from '../../../validation/Validators'

export const pathsObject = object(dictionaryOf(object()))
