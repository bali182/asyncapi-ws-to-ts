import { BaseGenerator } from './BaseGenerator'
import { TypesGenerator } from './TypesGenerator'
import { TypeGuardsGenerator } from './TypeGuardsGenerator'
import { ListenerTypeGenerator } from './ListenerTypeGenerator'
import { ListenerDispatcherGenerator } from './ListenerDispatcherGenerator'
import { ListenerStubGenerator } from './ListenerStubGenerator'

export class RootGenerator extends BaseGenerator<void> {
  generate(): string {
    const generators = [
      new TypesGenerator(this.registry),
      new TypeGuardsGenerator(this.registry),
      new ListenerTypeGenerator(this.registry),
      new ListenerStubGenerator(this.registry),
      new ListenerDispatcherGenerator(this.registry),
    ]
    return this.format(generators.map((g) => g.generate()).join('\n'))
  }
}
