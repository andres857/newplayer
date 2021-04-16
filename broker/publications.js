const MQTT = require("async-mqtt");
const {serverBroker,options} = require('./index')
const {buildTopics} = require('./topics');
const {load,getInterfaces} = require('../infosystem')

const intervalPublish = 500;


async function doPublish() {
    const topics = await buildTopics()
    const loadPlayer = await load()
    const network = await getInterfaces()
    const client = await MQTT.connectAsync(`mqtt://${serverBroker}`,options)
   
    console.log("Starting");
      try {
          await client.publish(topics.publish.network, JSON.stringify(network));
          await client.publish(topics.publish.load, JSON.stringify(loadPlayer));

          // This line doesn't run until the server responds to the publish
          await client.end();
          // This line doesn't run until the client has disconnected without error
          console.log("Done");
      } catch (e){
          // Do something about it!
          console.log(e.stack);
          process.exit();
      }
  }


async function delay(ms) {
   return await new Promise(resolve => setTimeout(resolve, ms));
}

let run = async ()=>{
    while (true){
        doPublish();
        await delay(intervalPublish);
    }
  }

try {
    run();
}catch (error) {
    console.error(`Problema al publicar ${error}`);
}

