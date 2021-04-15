const mqtt = require("mqtt");
require('dotenv').config();


const serverBroker = process.env.SERVERBROKER 
const clientPlayer = process.env.CLIENT
const idPlayer = process.env.IDPLAYER


const options = {
    connectTimeout:4000,
    clientId: 'laptopAndrestest',
    username:'emqx',
    password: 'public',
    keepalive:60,
    clean:true
}

const topics = {
    suscriber:{
    config:`${clientPlayer}/players/${idPlayer}/config`,
    broadcast:`${clientPlayer}/players/${idPlayer}/urlStreaming`,
    },
    publish:{
    status: `${clientPlayer}/players/${idPlayer}/status`,
    }
}

client = mqtt.connect(`mqtt://${serverBroker}`,options);

if(!client.connected){
    console.log(`Client not Connected`);
}

client.on('reconnect',function(){
    console.log('reconectando');
})



module.exports={
    client,
    topics
}




