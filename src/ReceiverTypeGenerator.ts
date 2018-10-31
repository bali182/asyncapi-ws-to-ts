import { BaseGenerator } from './BaseGenerator'
import { ReferenceObject } from './AyncApiTypings'
import last from 'lodash/last'
import { MessageWrapper } from './MessageWrapper'

export class ReceiverTypeGenerator extends BaseGenerator<void> {
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
  getRawName(ref: ReferenceObject): string {
    return last(ref.$ref.split('/'))
  }
  generateCondition(msg: MessageWrapper): string {
    const np = this.registry.getNameProvider()
    return `${np.getTypeGuardName(np.getPayloadTypeName(msg.getOperationId()))}(input)`
  }
  generateDispatch(msg: MessageWrapper): string {
    const np = this.registry.getNameProvider()
    return `return this.__listener.${np.getListenerMethodName(msg.getOperationId())}(input)`
  }
  generateConditions(): string {
    const msgs = this.registry.getReceiveMessages()
    return msgs
      .map((msg, i) => {
        const keyword = i === 0 ? 'if' : 'else if'
        return `${keyword}(${this.generateCondition(msg)}) {
        ${this.generateDispatch(msg)}
      }`
      })
      .join('\n')
  }
  generate(): string {
    const np = this.registry.getNameProvider()
    // ${this.generateListenerMethodSignatures()}
    return `export class ${np.getReceiverTypeName()} {
      private readonly __listener: ${np.getListenerTypeName()}
      constructor(listener: ${np.getListenerTypeName()}) {
        this.__listener = listener
      }
      receive(input: any): void {
        ${this.generateConditions()}
        throw new TypeError('Unrecognized payload value!')
      }
    }`
  }
}
