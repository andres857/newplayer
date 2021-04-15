// const {client, topics} = require('../broker/index');
// const {shutdown} = require('../controller/device.js')

// client.on('message',function(topic, payload){
//     console.log(`received from ${topic} : ${payload.toString()}`)
//     let message = JSON.parse(payload)
//     if (topic == topics.suscriber.config){

//         if (message.restart=="true"){
//             shutdown(function(output){
//             console.log(output);
//             });
//         }else{
//             console.log('Peticiones no validas');
//         }
//     }
//     else if(topic == topics.suscriber.broadcast){
//         console.log(`holamundo broadcast`);
//     }
// });