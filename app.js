const {launchPlayer} = require('./controllerPlayer/player')
const {buildTopics} = require('./broker/topics');
const {getClient} = require('./broker/index')
const {getStreaming, doSubscription} = require('./broker/subscriptions')
require('dotenv').config()


async function main (){

  const topics = await buildTopics()
  const client = await getClient()
  
    return await new Promise (resolve => {
      
      doSubscription(topics,client)
      launchPlayer(topics,client)

      setInterval(()=>{
      // lanza el player y se verifica si el servidor multimedia esta activo cada x tiempo
        let streaming = getStreaming()

        launchPlayer(topics,client)
        console.log(`[ App - ${streaming}]`);

       },15000)
    })
}

main()
