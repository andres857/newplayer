
const {getClient} = require('./index')
const {buildTopics} = require('./topics');
const {shutdown} = require('../controllerPlayer/device')


async function doSubscription() {
    const topics = await buildTopics()
    const client = await getClient()

      try {
          await client.subscribe(topics.suscriber.config);
          await client.subscribe(topics.suscriber.urlStreaming);


          console.log(`Client subscribe to topic ${topics.suscriber.config}`);
          console.log(`Client subscribe to topic ${topics.suscriber.urlStreaming}`);

          // received messages from broker
          client.on('message',function(topic, payload){
              console.log(`received from ${topic} : ${payload.toString()}`)
              let message = JSON.parse(payload)
              if (topic == topics.suscriber.config){

                  if (message.restart=="true"){
                    console.log('simulando reinicio del player');
                      shutdown(function(output){
                      console.log(output);
                      });

                  }else{
                      console.log('Peticiones no validas');
                  }
              }
              else if(topic == topics.suscriber.urlStreaming){
                  console.log(`Url canal1`);
              }
          });

      } catch (e){
          // Do something about it!
          console.log(e.stack);
          process.exit();
      }
  }
// doSubscription()
module.exports ={
    doSubscription,
}
