// const {client, topics} = require('../broker/index');
// const {statusplayer} = require('../infosystem')


// const interval = 10000;

// async function doPublish(){
//   const statusPlayer = await statusplayer();
//   client.publish(topics.publish.status, JSON.stringify(statusPlayer),(e)=>{
//       console.log(e || 'Publish Success to topic', topics.publish.status);
//   });
// }

// async function delay(ms) {
//     return await new Promise(resolve => setTimeout(resolve, ms));
// }

// let run = async ()=>{
//     while (true){
//         doPublish();
//         await delay(interval);
//     }
//   }

// try {
//     run();
// }catch (error) {
//     console.error(`Problema al publicar ${error}`);
//     }

// module.exports = {
//   doPublish:run
// }
