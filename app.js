require('dotenv').config()
const {launchPlayer} = require('./controllerPlayer/player')
const {buildTopics} = require('./broker/topics');
const {connectBroker} = require('./broker/index')
const {doSubscription} = require('./broker/subscriptions')
const streaming = require ('./channel')

// el streaming inicial es el canal institucional, imbanacoTV
async function main (){
  const topics = await buildTopics()
  const client = await connectBroker()

    try {
      await doSubscription(topics,client)
      await launchPlayer(topics.publish.currentStreaming, client, streaming)

    } catch (error) {
      console.log(`[ App - error connected to broker, ${error} ]`);
    }
}

main()
