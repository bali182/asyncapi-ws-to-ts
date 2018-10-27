import { BaseGenerator } from './BaseGenerator'
import { TypesGenerator } from './TypesGenerator'
import { TypeGuardsGenerator } from './TypeGuardsGenerator'

export class RootGenerator extends BaseGenerator<void> {
  generate(): string {
    const generators = [new TypesGenerator(this.registry), new TypeGuardsGenerator(this.registry)]
    return this.format(generators.map((g) => g.generate()).join('\n'))
  }
}
