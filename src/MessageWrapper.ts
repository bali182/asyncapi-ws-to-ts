import { MessageObject, AsyncApiSpec, SchemaObject, ReferenceObject } from './AyncApiTypings'
import { isRefType, isSchemaType } from './utils'
import last from 'lodash/last'

export const enum MessageType {
  SEND = 'SEND',
  RECEIVE = 'RECEIVE',
}

export class MessageWrapper {
  public readonly spec: AsyncApiSpec
  public readonly type: MessageType
  public readonly message: MessageObject
  constructor(spec: AsyncApiSpec, type: MessageType, message: MessageObject | ReferenceObject) {
    this.spec = spec
    this.type = type
    this.message = this.resolveMessageObject(message)
  }
  private resolveMessageObject(message: MessageObject | ReferenceObject): MessageObject {
    if (isRefType(message)) {
      const parts = message.$ref.split('/')
      if (parts.length !== 4 || parts[0] !== '#' || parts[1] !== 'components' || parts[2] !== 'messages') {
        throw new TypeError(`Can't resolve ref ${message.$ref}!`)
      }
      const name = last(parts)
      const msg = this.spec.components.messages[last(parts)]
      const enhancedMsg: MessageObject = {
        ...msg,
        operationId: msg.operationId ? msg.operationId : name,
      }
      return enhancedMsg
    }
    return message
  }
  getOperationId(): string {
    const { operationId, payload } = this.message
    if (operationId) {
      return operationId
    }
    if (isRefType(payload)) {
      return last(payload.$ref.split('/'))
    }
    throw new TypeError(`Cannot infer operation id!`)
  }
  getPayloadSchema(): SchemaObject {
    const { payload } = this.message
    if (isSchemaType(payload)) {
      return payload
    } else {
      const parts = payload.$ref.split('/')
      if (parts.length !== 4 || parts[0] !== '#' || parts[1] !== 'components' || parts[2] !== 'schemas') {
        throw new TypeError(`Can't resolve ref ${payload.$ref}!`)
      }
      return this.spec.components.schemas[last(parts)]
    }
  }
}
