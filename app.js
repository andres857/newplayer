const {launchPlayer} = require('./controllerPlayer/player')
const {buildTopics} = require('./broker/topics');
const {getClient} = require('./broker/index')
const {doSubscription} = require('./broker/subscriptions')
require('dotenv').config()


const url_Streaming = process.env.URL_STREAMING


async function main (){

  const topics = await buildTopics()
  const client = await getClient()

  await doSubscription(topics,client)
  await launchPlayer(topics, client, url_Streaming)

}

main()
