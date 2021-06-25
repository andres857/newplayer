const {buildTopics} = require('./topics');
const {doPublishStatusPlayer} = require('./publications')
const {shutdown} = require('../controllerPlayer/device')
const {restartPlayer, player} =require('../controllerPlayer/player')

let streaming = {
  wchannel : "rtsp://192.168.5.223/InstitucionalTv",
  comercial : "rtsp://192.168.5.100/Comercial"
}


async function doSubscription(topics,client) {
    const topicspublish = await buildTopics()

      try {
        await client.subscribe(topics.suscriber.channel);
        await client.subscribe(topics.suscriber.request);
        await client.subscribe(topics.suscriber.restart);


        console.log(`[ Broker - Client subscribe to topic ${topics.suscriber.channel} ]`);
        console.log(`[ Broker - Client subscribe to topic ${topics.suscriber.request} ]`);
        console.log(`[ Broker - Client subscribe to topic ${topics.suscriber.restart} ]`);


      } catch (e) {
        console.log(`[ Broker - Error subscriber to broker ${e} ]`);
      }

      // received messages from broker
      client.on('message', function(topic, payload){
          console.log(`[ Broker - received from ${topic} : ${payload.toString()} ]`)
          let message = JSON.parse(payload)

          if (topic == topics.suscriber.request) {
            if (message.status == "device") {
              try{
              console.log(`[ Broker - Publicando en el topic ${client,topics.publish.status} ]`);
              doPublishStatusPlayer(client,topics.publish.status)
              }catch(e){
                console.log(`[ Broker - ${e.stack} error Publicando]`);
              }
            } else if (message.restart=="device"){
              shutdown(function(output){
              console.log(output);
              });
            } else if (message.restart=="player"){
              restartPlayer('request Web')

            } 
            else{
              console.log(`[ Broker - Peticiones no validas ]`);
                }
                
          } else if (topic == topics.suscriber.channel){

            if (message.channel == "rcn"){
              console.log(`[ Broker - Simular cambiar a emision ${streaming.comercial} ]`);
              player.load(streaming.comercial)

            }else if(message.channel == "imbanacotv"){
              console.log(`[ Broker - Simular cambiar a emision ${streaming.wchannel} ]`);
              player.load(streaming.wchannel)
            }

          } else if (topic == topics.suscriber.restart){
            if (message.restart == "player"){
              restartPlayer('request Web')

            } else if(message.restart == "device"){
              shutdown(function(output){
                console.log(output);
                });
            }
          }
      });
  }

function getStreaming(){
  return streaming
}

module.exports ={
    doSubscription,
    getStreaming
}
