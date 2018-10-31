import { BaseGenerator } from './BaseGenerator'
import { ReferenceObject } from './AyncApiTypings'
import last from 'lodash/last'
import { MessageWrapper } from './MessageWrapper'

export class ListenerTypeGenerator extends BaseGenerator<void> {
  generateListenerMethodSignature(msg: MessageWrapper): string {
    const np = this.registry.getNameProvider()
    const name = msg.getOperationId()
    return `${np.getListenerMethodName(name)}(payload: ${np.getPayloadTypeName(name)}): void`
  }
  generateListenerMethodSignatures() {
    return this.registry
      .getReceiveMessages()
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
