const {launch} = require('./controllerPlayer/player')
const {buildTopics} = require('./broker/topics');
const {getClient} = require('./broker/index')
const {doSubscription} = require('./broker/subscriptions')
const {doPublishStatusPlayer} = require('./broker/publications')

require('dotenv').config()

async function main (){
  const topics = await buildTopics()
  const client = await getClient()

    return await new Promise (resolve => {
         doSubscription(topics,client)

         launch()

        setInterval(()=>{
          // lanza el player y se verifica si el servidor multimedia esta activo cada x tiempo
         launch()
       },120000)
    })
}

main()
