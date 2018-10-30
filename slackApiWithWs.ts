import { SlackApiSender, SlackApiListenerStub, MessagePayload, SlackApiReceiver } from './slackApi'

const ws = new WebSocket('...slack api url...')
const sendAdapter = {
  send(payload: any): void {
    // add auth stuff if needed
    ws.send(JSON.stringify(payload))
  },
}
const messageSender = new SlackApiSender(sendAdapter)

class MySlackApiListener extends SlackApiListenerStub {
  message(payload: MessagePayload) {
    console.log('message', payload.text)
    messageSender.outgoingMessage({
      type: 'message',
      id: 0, // ???
      channel: payload.channel,
      text: `I received your message: ${payload.text}`,
    })
  }
}

const receiver = new SlackApiReceiver(new MySlackApiListener())

ws.addEventListener('message', ({ data }) => receiver.receive(JSON.parse(data)))
