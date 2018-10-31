import WebSocket from 'ws'
import readline from 'readline'
import chalk from 'chalk'
import {
  SlackApiClientMessageSender,
  SlackApiClientMessageReceiver,
  SlackApiClientListenerStub,
  MessagePayload,
} from './slackApiClient'

const ws = new WebSocket('ws://localhost:3000')
class MySlackApiListener extends SlackApiClientListenerStub {
  message(payload: MessagePayload) {
    console.log(`${chalk.bgBlue('[server]')}: "${payload.text}"`)
  }
}
const receiver = new SlackApiClientMessageReceiver(new MySlackApiListener())
ws.addEventListener('message', ({ data }) => receiver.receive(JSON.parse(data)))

const sendAdapter = {
  send: (payload: any) => ws.send(JSON.stringify(payload)),
}

const messageSender = new SlackApiClientMessageSender(sendAdapter)

const cliInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function recursiveAsyncReadLine() {
  cliInterface.question('', (text) => {
    if (text == 'exit') {
      cliInterface.close()
    }
    messageSender.outgoingMessage({ type: 'message', text })
    recursiveAsyncReadLine()
  })
}

recursiveAsyncReadLine()
