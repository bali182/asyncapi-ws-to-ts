import { MessageObject } from './OpenApiTypings'

export class MessageWrapper {
  public readonly name: string
  public readonly message: MessageObject
  constructor(name: string, message: MessageObject) {
    this.name = name
    this.message = message
  }
}
