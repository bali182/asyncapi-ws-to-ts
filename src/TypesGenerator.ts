import { BaseGenerator } from './BaseGenerator'
import { TypeGenerator } from './TypeGenerator'

export class TypesGenerator extends BaseGenerator<void> {
  generate(): string {
    const typeGenerator = new TypeGenerator(this.registry)
    return this.registry
      .getTypeNames()
      .map((name) => typeGenerator.generate(name))
      .join('\n')
  }
}
