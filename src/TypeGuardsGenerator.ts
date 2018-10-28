import { BaseGenerator } from './BaseGenerator'
import { TypeGuardGenerator } from './TypeGuardGenerator'

export class TypeGuardsGenerator extends BaseGenerator<void> {
  generate(): string {
    const generator = new TypeGuardGenerator(this.registry)
    return this.registry
      .getMessageTypes()
      .map((type) => generator.generate(type))
      .join('\n')
  }
}
