const {statusPlayer} = require('../infosystem')

async function doPublishStatusPlayer(client,topics) {
    const status = await statusPlayer()
      try {
          await client.publish(topics, JSON.stringify(status),{qos:2,retain:true});
      } catch (e){
          console.log(e.stack);
          process.exit();
      }
  }

async function doPublishCurrentStreaming(client,topics,streaming) {
    try {
        await client.publish(topics, JSON.stringify(streaming));
    } catch (e){
        console.log(e.stack);
        process.exit();
    }
}

module.exports ={
    doPublishStatusPlayer,
    doPublishCurrentStreaming
}
