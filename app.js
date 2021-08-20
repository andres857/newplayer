require('dotenv').config()
const {connect, createPlayer} = require('./db/controller/playerController')
const {launchPlayer} = require('./controllerPlayer/player')
const {buildTopics} = require('./broker/topics');
const {connectBroker} = require('./broker/index')
const {doSubscription} = require('./broker/subscriptions')
const streaming = require ('./channel')

const urldb = "mongodb://desarrollo:8K9O1hMZiQOxbXTK@cluster0-shard-00-00.qvhzi.mongodb.net:27017,cluster0-shard-00-01.qvhzi.mongodb.net:27017,cluster0-shard-00-02.qvhzi.mongodb.net:27017/ValledeLiliSedeLimonar?ssl=true&replicaSet=atlas-gpeftf-shard-0&authSource=admin&retryWrites=true&w=majority"

// el streaming inicial es el canal institucional, imbanacoTV
async function main (){
  const topics = await buildTopics()
  const client = await connectBroker()

    try {
      await doSubscription(topics,client)
      await connect(urldb)
      await createPlayer()
      await launchPlayer(topics.publish.currentStreaming, client, streaming)

    } catch (error) {
      console.log(`[ App - error connected to broker, ${error} ]`);
    }
}

setTimeout(()=>{
  main()
},20000)

