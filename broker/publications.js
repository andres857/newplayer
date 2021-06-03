const {statusPlayer,getInterfaces} = require('../infosystem')

async function doPublishStatusPlayer(client,topics) {
    const status = await statusPlayer()
    const network = await getInterfaces()

      try {
          //await client.publish(topics.publish.network, JSON.stringify(network));
          await client.publish(topics.publish.status, JSON.stringify(status));
          // This line doesn't run until the server responds to the publish
          // await client.end();
          // This line doesn't run until the client has disconnected without error

      } catch (e){
          // Do something about it!
          console.log(e.stack);
          process.exit();
      }
  }

// doPublish()
module.exports ={
    doPublishStatusPlayer,
}
