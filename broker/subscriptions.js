// const {getClient} = require('./index')
const {buildTopics} = require('./topics');
const {doPublishStatusPlayer} = require('./publications')
const {shutdown} = require('../controllerPlayer/device')
const {closePlayer,restartPlayer} =require('../controllerPlayer/player')
let streaming = 'init'


async function doSubscription(topics,client) {
    const topicspublish = await buildTopics()

      try {
        await client.subscribe(topics.suscriber.channel);
        await client.subscribe(topics.suscriber.request);

        console.log(`[ Broker - Client subscribe to topic ${topics.suscriber.channel} ]`);
        console.log(`[ Broker - Client subscribe to topic ${topics.suscriber.request} ]`);

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
              // console.log('simulando reinicio del Device');
              shutdown(function(output){
              console.log(output);
              });
            } else if (message.restart=="player"){
              restartPlayer('request Web')
                }
            else{
              console.log(`[ Broker - Peticiones no validas ]`);
                }
          }

          else if(topic == topics.suscriber.channel){
            if (message.channel == "comercial"){
              streaming = 'comercial'
              console.log(`[ Broker - Simular cambiar a emision ${streaming} ]`);
            }else if(message.channel == "wchannel"){
              streaming = 'wchannel'
              console.log(`[ Broker - Simular cambiar a emision ${streaming} ]`);
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
