import { isNil } from '../utils'
import { Issue, Validator, IssueType, Severity, ValidatorConfig, ValueType } from './typings'

const TypeChecks = {
  [ValueType.ARRAY]: Array.isArray,
  [ValueType.BOOLEAN]: (input: any) => typeof input === 'boolean',
  [ValueType.NIL]: (input: any) => input === null || input === undefined,
  [ValueType.NUMBER]: (input: any) => typeof input === 'number',
  [ValueType.OBJECT]: (input: any) => typeof input === 'object' && input !== null,
  [ValueType.STRING]: (input: any) => typeof input === 'string',
}

const depthStop =
  <T>(validate: Validator<T>): Validator<T> =>
  (input: any, config: ValidatorConfig): Issue[] =>
    config.depth <= 0 ? [] : validate(input, config)

export const any: Validator<any> = (): Issue[] => []

export const type =
  <T>(...types: ValueType[]) =>
  (validate: Validator<T> = any): Validator<any> =>
    depthStop((input: any, config: ValidatorConfig): Issue[] => {
      if (!types.some((type) => TypeChecks[type](input))) {
        return [
          {
            type: IssueType.TYPE,
            message: types.length === 1 ? `should be a(n) ${types[0]}` : `should be one of [${types.join(', ')}]`,
            path: config.path,
          },
        ]
      }
      return validate(input, config)
    })

export const string = type<string>(ValueType.STRING)
export const number = type<number>(ValueType.NUMBER)
export const boolean = type<boolean>(ValueType.BOOLEAN)
export const nil = type<null | undefined>(ValueType.NIL)
export const array = type<any[]>(ValueType.ARRAY)
export const object = type<object>(ValueType.OBJECT)
export const primitive = type<string | number | boolean>(ValueType.STRING, ValueType.NUMBER, ValueType.BOOLEAN)

export const enumeration = <T>(values: T[]): Validator<any> =>
  depthStop((input: T, config: ValidatorConfig): Issue[] => {
    if (values.indexOf(input) < 0) {
      return [
        {
          type: IssueType.ENUM,
          message: `should be one of ${values}`,
          path: config.path,
        },
      ]
    }
    return []
  })

export const items = (...validators: Validator<any>[]): Validator<any> =>
  depthStop((input: any[], { path, depth, pathAccessor }: ValidatorConfig): Issue[] => {
    if (input.length !== validators.length) {
      return [
        {
          type: IssueType.LENGTH,
          message: `should have ${validators.length} items`,
          path,
        },
      ]
    }
    const issues: Issue[] = []
    for (let i = 0; i < input.length; i += 1) {
      issues.push(
        ...validators[i](input[i], {
          depth: depth - 1,
          path: pathAccessor.append(i.toString()),
          pathAccessor,
        }),
      )
    }
    return issues
  })

export const itemsOf = (validate: Validator<any>): Validator<any[]> =>
  depthStop((input: any[], { path, depth, pathAccessor }: ValidatorConfig): Issue[] => {
    const issues: Issue[] = []
    for (let i = 0; i < input.length; i += 1) {
      issues.push(
        ...validate(input[i], {
          depth: depth - 1,
          path: pathAccessor.append(path, i.toString()),
          pathAccessor,
        }),
      )
    }
    return issues
  })

export const fields = <T extends object>(validators: Record<keyof T, Validator<any>>): Validator<T> =>
  depthStop((input: object, { path, depth, pathAccessor }: ValidatorConfig): Issue[] => {
    const keys = Object.keys(input)
    const expectedKeys = Object.keys(validators)
    const extraKeys: string[] = keys.filter((key) => expectedKeys.indexOf(key) < 0)
    const issues: Issue[] = []

    for (let i = 0; i < expectedKeys.length; i += 1) {
      const key = expectedKeys[i]
      const value = input[key]
      const validator = validators[key]
      issues.push(
        ...validator(value, {
          depth: depth - 1,
          path: pathAccessor.append(path, key),
          pathAccessor,
        }),
      )
    }

    // TODO allow extra key validation
    if (extraKeys.length > 0 && !!false) {
      issues.push(
        ...extraKeys.map(
          (key): Issue => ({
            type: IssueType.EXTRA_KEY,
            severity: Severity.ERROR,
            message: `should not have key "${key}"`,
            path: pathAccessor.append(path, key),
          }),
        ),
      )
    }

    return issues
  })

export const dictionaryOf = (validate: Validator<any>): Validator<object> =>
  depthStop((input: object, { path, depth, pathAccessor }: ValidatorConfig): Issue[] => {
    const issues: Issue[] = []
    const keys = Object.keys(input)
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i]
      issues.push(
        ...validate(input[key], {
          depth: depth - 1,
          path: pathAccessor.append(path, key),
          pathAccessor,
        }),
      )
    }
    return issues
  })

export const optional =
  (validator: Validator<any> = any): Validator<any> =>
  (input: any, config: ValidatorConfig): Issue[] => {
    return isNil(input) ? [] : validator(input, config)
  }

export const combine = <T>(...validators: Validator<T>[]): Validator<T> =>
  depthStop((input: T, config: ValidatorConfig): Issue[] => {
    const issues: Issue[] = []
    for (let i = 0; i < validators.length; i += 1) {
      const partialIssues = validators[i](input, config)
      if (partialIssues.length > 0) {
        issues.push(...partialIssues)
      }
    }
    return issues
  })

export const union = (validators: Record<string, Validator<any>>): Validator<any> =>
  depthStop((input: any, config: ValidatorConfig): Issue[] => {
    const keys = Object.keys(validators)

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i]
      const validator = validators[key]
      // Validate only 1 level, otherwise deep issues can prevent detecting the intended type
      const children = validator(input, { ...config, depth: 1 })
      // If one of the types validated successfully, we are good, nothing to do
      if (children.length === 0) {
        return []
      }
      // TODO collect the messages, organize them to give better reasoning for failure
    }

    return [
      {
        type: IssueType.UNION,
        message: `should be one of ${keys}`,
        path: config.path,
      },
    ]
  })

export const lazy =
  <T>(factory: () => Validator<T>): Validator<T> =>
  (input: T, config: ValidatorConfig): Issue[] =>
    factory()(input, config)
