const {statusPlayer} = require('../infosystem')


async function doPublishStatusPlayer(client,topics) {
    const status = await statusPlayer()
      try {
          await client.publish(topics, JSON.stringify(status),{qos:2, retain:true});
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



module.exports ={
    doPublishStatusPlayer,
    doPublishCurrentStreaming,
}
