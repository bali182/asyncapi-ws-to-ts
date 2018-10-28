import { MessageObject } from './AyncApiTypings'

export class MessageWrapper {
  public readonly name: string
  public readonly message: MessageObject
  constructor(name: string, message: MessageObject) {
    this.name = name
    this.message = message
  }
}
