import { BaseGenerator } from './BaseGenerator'
import { ReferenceObject } from './AyncApiTypings'
import last from 'lodash/last'

export class SenderTypeGenerator extends BaseGenerator<void> {
  generateMethod(ref: ReferenceObject): string {
    const np = this.registry.getNameProvider()
    const name = last(ref.$ref.split('/'))
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
      .getSendRefs()
      .map((ref) => this.generateMethod(ref))
      .join('\n')
    return `export class ${np.getSenderTypeName()} {
      private readonly __adapter: { send: (any) => void }
      constructor(adapter: { send: (any) => void }) {
        this.__adapter = adapter
      }
      ${methods}
    }`
  }
}
