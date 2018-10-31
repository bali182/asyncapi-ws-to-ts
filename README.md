# Usage

1. `npm install -g bali182/asyncapi-ws-to-ts`
2. Generate client code: `asyncapi-ws-to-ts -f async-api-schema.json -t client -n MyApiClient > myApiClient.ts`
2. Generate server code: `asyncapi-ws-to-ts -f async-api-schema.json -t server -n MyApiServer > myApiServer.ts`
3. Done ✅

# Run sample
1. Open 2 terminals (be inside project folder)
2. In terminal 1: `npm run sample-server`. Make sure port 3000 is open.
3. In terminal 2: `npm run sample-client`. After this you can type messages to the standard input.
4. Source can be found under the `/examples` folder.

![Demo](https://user-images.githubusercontent.com/3879181/47803941-833dd580-dd2b-11e8-9b81-ccc7814638ea.gif)
