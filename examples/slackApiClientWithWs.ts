import {
  SlackApiClientMessageSender,
  SlackApiClientMessageReceiver,
  SlackApiClientListenerStub,
  MessagePayload,
} from './slackApiClient'

const ws = new WebSocket('...slack api url...')
const sendAdapter = {
  send(payload: any): void {
    // add auth stuff if needed
    ws.send(JSON.stringify(payload))
  },
}
const messageSender = new SlackApiClientMessageSender(sendAdapter)

class MySlackApiListener extends SlackApiClientListenerStub {
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

const receiver = new SlackApiClientMessageReceiver(new MySlackApiListener())

ws.addEventListener('message', ({ data }) => receiver.receive(JSON.parse(data)))
