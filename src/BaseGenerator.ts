import { IGenerator } from './typings'
import { TypeRegistry } from './TypeRegistry'
import prettier from 'prettier'

export abstract class BaseGenerator<Input> implements IGenerator<Input> {
  protected readonly registry: TypeRegistry
  constructor(registry: TypeRegistry) {
    this.registry = registry
  }
  protected format(source: string): string {
    return prettier.format(source, {
      printWidth: 120,
      semi: false,
      parser: 'typescript',
      tabWidth: 2,
      useTabs: false,
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      arrowParens: 'always',
    })
  }
  abstract generate(input: Input): string
}
