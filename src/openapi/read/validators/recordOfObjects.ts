import { object, dictionaryOf } from '../../../validation/Validators'

export const recordOfObjects = object(dictionaryOf(object()))
