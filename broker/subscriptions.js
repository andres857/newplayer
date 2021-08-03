const moment = require('moment');
const {doPublishStatusPlayer,doPublishCurrentStreaming} = require('./publications')
const {shutdown} = require('../controllerPlayer/device')
const {restartPlayer, player} = require('../controllerPlayer/player')
const {streaming} = require ('../infosystem')



async function doSubscription(topics,client) {

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
      client.on('message', async function(topic, payload){
          console.log(`[ Broker - received from ${topic} : ${payload.toString()} ]`)
          let message = JSON.parse(payload)

          if (topic == topics.suscriber.request) {
            if (message.status == "device") {
              try{
              console.log(`[ Broker - Publicando en el topic ${client,topics.publish.status} ]`);
              await doPublishStatusPlayer(client,topics.publish.status)
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

            if(message.channel == "imbanacotv"){
              console.log(`[ Broker - Simular cambiar a emision ${streaming.wchannel.url} ]`);
              player.load(streaming.wchannel.url)

              let currentChannel = {
                emision:streaming.wchannel.channel,
                lastseen: moment().format('MMMM Do YYYY, h:mm:ss a')
              }

              await doPublishCurrentStreaming(topics.publish.currentStreaming,client,currentChannel)
            }else{
              console.log(`[ Broker - message received ${message}]`,message);
              console.log(`[ Broker - Simular cambiar a emision ${streaming.comercial.url} ]`);
              player.load(streaming.comercial.url)

              let currentChannel = {
                emision:message.channel,
                lastseen: moment().format('MMMM Do YYYY, h:mm:ss a')
              }
              await doPublishCurrentStreaming(topics.publish.currentStreaming,client,currentChannel)
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


module.exports ={
    doSubscription,
}
