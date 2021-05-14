export type PathItem = string | number

export enum ValueType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  NIL = 'nil',
  OBJECT = 'object',
  ARRAY = 'array',
}

export enum Severity {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export enum IssueType {
  TYPE = 'type',
  ENUM = 'enum',
  LENGTH = 'length',
  UNION = 'union',
  EXTRA_KEY = 'extra-key',
}

export type Issue = {
  severity?: Severity | string
  type: IssueType | string
  path: ReadonlyArray<PathItem>
  message: string
}

export type ValidatorConfig = {
  path: PathItem[]
  depth: number
}

export type Validator<T> = (input: T, path?: ValidatorConfig) => Issue[]
