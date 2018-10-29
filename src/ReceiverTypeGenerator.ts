import { BaseGenerator } from './BaseGenerator'
import { ReferenceObject } from './AyncApiTypings'
import last from 'lodash/last'

export class ReceiverTypeGenerator extends BaseGenerator<void> {
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
  getRawName(ref: ReferenceObject): string {
    return last(ref.$ref.split('/'))
  }
  generateCondition(ref: ReferenceObject): string {
    const np = this.registry.getNameProvider()
    return `${np.getTypeGuardName(np.getPayloadTypeName(this.getRawName(ref)))}(input)`
  }
  generateDispatch(ref: ReferenceObject): string {
    const np = this.registry.getNameProvider()
    return `this.__listener.${np.getListenerMethodName(this.getRawName(ref))}(input)`
  }
  generateConditions(): string {
    const refs = this.registry.getReceiveRefs()
    return refs
      .map((ref, i) => {
        const keyword = i === 0 ? 'if' : 'else if'
        return `${keyword}(${this.generateCondition(ref)}) {
        ${this.generateDispatch(ref)}
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
      dispatch(input: any): void {
        ${this.generateConditions()}
        throw new TypeError('Unrecognized payload value!')
      }
    }`
  }
}
