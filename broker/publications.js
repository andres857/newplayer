const {statusPlayer} = require('../infosystem')


async function doPublishStatusPlayer(client,topics) {
    const status = await statusPlayer()
      try {
          // await client.publish(topics.publish.currentStreaming, JSON.stringify(playerPlayGlobal));
          await client.publish(topics.publish.status, JSON.stringify(status));
          // This line doesn't run until the server responds to the publish
          // await client.end();

      } catch (e){
          // Do something about it!
          console.log(e.stack);
          process.exit();
      }
  }


// async function doPublishcurrentStreaming(client,topics,playerPlayGlobal) {
//
//       try {
//           await client.publish(topics.publish.currentStreaming, JSON.stringify(playerPlayGlobal));
//           // This line doesn't run until the server responds to the publish
//           // await client.end();
//       } catch (e){
//           // Do something about it!
//           console.log(e.stack);
//           process.exit();
//       }
//   }



// doPublishcurrentStreaming()
module.exports ={
    doPublishStatusPlayer,
    // doPublishcurrentStreaming
}
