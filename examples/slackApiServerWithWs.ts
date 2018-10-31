import { Server as WebSocketServer } from 'ws'
import chalk from 'chalk'
import {
  __SendMessageAdapter,
  SlackApiServerMessageSender,
  SlackApiServerMessageReceiver,
  SlackApiServerListenerStub,
  OutgoingMessagePayload,
} from './slackApiServer'

const server = new WebSocketServer({
  port: 3000,
  verifyClient: () => true,
})

class MyListener extends SlackApiServerListenerStub {
  private readonly sender: SlackApiServerMessageSender
  constructor(sender: SlackApiServerMessageSender) {
    super()
    this.sender = sender
  }

  outgoingMessage(payload: OutgoingMessagePayload): void {
    console.log(`${chalk.bgGreen('[client]')}: "${payload.text}"`)
    this.sender.message({
      type: 'message',
      text: `I received your message "${payload.text}"!`,
    })
  }
}

server.on('connection', (connection) => {
  const adapter: __SendMessageAdapter = {
    send(payload: any): void {
      connection.send(JSON.stringify(payload))
    },
  }
  const sender = new SlackApiServerMessageSender(adapter)
  const receiver = new SlackApiServerMessageReceiver(new MyListener(sender))
  connection.on('message', (data) => {
    receiver.receive(JSON.parse(data.toString()))
  })
})
