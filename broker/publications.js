const {statusPlayer} = require('../infosystem')


async function doPublishStatusPlayer(client,topics) {
    const status = await statusPlayer()
      try {
          console.log(topics);
          console.log('------------');
          console.log(status);
          await client.publish(topics, JSON.stringify(status),{qos:2, retain:true});
          console.log(`[ Publications - publicando estados]`);
      } catch (e){
          console.log(e.stack);
          process.exit();
      }
  }

async function doPublishCurrentStreaming(topics, client, streaming) {
    try {
        await client.publish(topics, JSON.stringify(streaming),{qos:2, retain:true});
        console.log(`[Broker - publish the message ${JSON.stringify(streaming)} to topic ${topics}]`);
    } catch (e){
        console.log(e.stack);
        process.exit();
    }
}

// async function publishtest(client,topic,payload) {
//     await client.publish(topic,)
// }



module.exports ={
    doPublishStatusPlayer,
    doPublishCurrentStreaming,
}
