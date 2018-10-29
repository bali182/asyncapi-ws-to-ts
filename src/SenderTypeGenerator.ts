import { BaseGenerator } from './BaseGenerator'
import { ReferenceObject } from './AyncApiTypings'
import last from 'lodash/last'

export class SenderTypeGenerator extends BaseGenerator<void> {
  generateMethod(ref: ReferenceObject): string {
    const np = this.registry.getNameProvider()
    const name = last(ref.$ref.split('/'))
    return `${np.getSendMethodName(name)}(payload: ${np.getPayloadTypeName(name)}): void {
      this.__dispatcher.send(payload)
    }`
  }
  generate(): string {
    const np = this.registry.getNameProvider()
    const methods = this.registry
      .getSendRefs()
      .map((ref) => this.generateMethod(ref))
      .join('\n')
    return `export class ${np.getSenderTypeName()} {
      private readonly __dispatcher: { send: (any) => void }
      constructor(dispatcher: { send: (any) => void }) {
        this.__dispatcher = dispatcher
      }
      ${methods}
    }`
  }
}
