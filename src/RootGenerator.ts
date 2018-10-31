import { BaseGenerator } from './BaseGenerator'
import { TypesGenerator } from './TypesGenerator'
import { TypeGuardsGenerator } from './TypeGuardsGenerator'
import { ListenerTypeGenerator } from './ListenerTypeGenerator'
import { ReceiverTypeGenerator } from './ReceiverTypeGenerator'
import { ListenerStubGenerator } from './ListenerStubGenerator'
import { SenderTypeGenerator } from './SenderTypeGenerator'
import { StaticTypesGenerator } from './StaticTypesGenerator'

export class RootGenerator extends BaseGenerator<void> {
  generate(): string {
    const generators = [
      new StaticTypesGenerator(),
      new TypesGenerator(this.registry),
      new TypeGuardsGenerator(this.registry),
      new ListenerTypeGenerator(this.registry),
      new ListenerStubGenerator(this.registry),
      new ReceiverTypeGenerator(this.registry),
      new SenderTypeGenerator(this.registry),
    ]
    return this.format(generators.map((g) => g.generate()).join('\n'))
  }
}
