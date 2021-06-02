require('dotenv').config();
const MQTT = require("async-mqtt");

const serverBroker = process.env.SERVERBROKER
const idplayer = process.env.IDPLAYER

const options = {
    connectTimeout:4000,
    clientId: `player/${idplayer}`,
    username:'emqx',
    password: 'public',
    keepalive:60,
    clean:true
}

// console.log(options.clientId);

async function getClient(){
    return await MQTT.connectAsync(`mqtt://${serverBroker}`,options)
}


module.exports={
    getClient
}
