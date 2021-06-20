const {statusPlayer} = require('../infosystem')

async function doPublishStatusPlayer(client,topics) {
    const status = await statusPlayer()
      try {
        console.log(`publish`);
          await client.publish(topics, JSON.stringify(status));
          // await client.end();
      } catch (e){
          // Do something about it!
          console.log(e.stack);
          process.exit();
      }
  }

// doPublishcurrentStreaming()
module.exports ={
    doPublishStatusPlayer,
}
