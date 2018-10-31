import { BaseGenerator } from './BaseGenerator'
import { ReferenceObject } from './AyncApiTypings'
import last from 'lodash/last'
import { MessageWrapper } from './MessageWrapper'

export class SenderTypeGenerator extends BaseGenerator<void> {
  generateMethod(msg: MessageWrapper): string {
    const np = this.registry.getNameProvider()
    const name = msg.getOperationId()
    const payloadType = np.getPayloadTypeName(name)
    return `${np.getSendMethodName(name)}(payload: ${payloadType}): void {
      if(!${np.getTypeGuardName(payloadType)}(payload)) {
        throw new TypeError('Parameter payload should be of type ${payloadType}!')
      }
      this.__adapter.send(payload)
    }`
  }
  generate(): string {
    const np = this.registry.getNameProvider()
    const methods = this.registry
      .getSendMessages()
      .map((msg) => this.generateMethod(msg))
      .join('\n')
    return `export class ${np.getSenderTypeName()} {
      private readonly __adapter: __SendMessageAdapter
      constructor(adapter: __SendMessageAdapter) {
        this.__adapter = adapter
      }
      ${methods}
    }`
  }
}
