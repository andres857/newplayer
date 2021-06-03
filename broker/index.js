require('dotenv').config();
const MQTT = require("async-mqtt");

const clientPlayer = process.env.CLIENT
const salaEspera = process.env.SALA_DE_ESPERA
const tv = process.env.TV
const serverBroker = process.env.SERVERBROKER
const idplayer = process.env.IDPLAYER

const options = {
    connectTimeout:4000,
    clientId: `${clientPlayer}/player/${salaEspera}/${tv}/ddcef5209dc54d318d0afc859a42b7c2`,
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
