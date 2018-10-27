import { BaseGenerator } from './BaseGenerator'
import { TypeGuardGenerator } from './TypeGuardGenerator'

export class TypeGuardsGenerator extends BaseGenerator<void> {
  generate(): string {
    const generator = new TypeGuardGenerator(this.registry)
    return this.registry
      .getTypeNames()
      .map((name) => generator.generate(name))
      .join('\n')
  }
}
