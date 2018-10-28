import { BaseGenerator } from './BaseGenerator'
import { ReferenceObject } from './AyncApiTypings'
import last from 'lodash/last'

export class ListenerTypeGenerator extends BaseGenerator<void> {
  generateListenerMethodSignature(ref: ReferenceObject): string {
    const np = this.registry.getNameProvider()
    const name = last(ref.$ref.split('/'))
    return `${np.getListenerMethodName(name)}(payload: ${np.getPayloadTypeName(name)}): void`
  }
  generateListenerMethodSignatures() {
    return this.registry
      .getReceiveRefs()
      .map((ref) => this.generateListenerMethodSignature(ref))
      .join('\n')
  }

  generate(): string {
    const np = this.registry.getNameProvider()
    return `export type ${np.getListenerTypeName()} = {
      ${this.generateListenerMethodSignatures()}
    }`
  }
}
