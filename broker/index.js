require('dotenv').config();
const MQTT = require("async-mqtt");
const {serialPlayer} = require('../infosystem')


const clientPlayer = process.env.CLIENT
const salaEspera = process.env.SALA_DE_ESPERA
const tv = process.env.TV
const serverBroker = process.env.SERVERBROKER



async function buildOptions(){
    let idPlayerw = await serialPlayer()
    let idPlayer = idPlayerw.slice(0,6)
    const options = {
        connectTimeout:4000,
        clientId: `${clientPlayer}/player/${idPlayer}`,
        username:'emqx',
        password: 'public',
        keepalive:60,
        clean:true
    }
    return options
}


// console.log(options.clientId);

async function getClient(){
  try {
    let options = await buildOptions()
    return await MQTT.connectAsync(`mqtt://${serverBroker}`,options)
  } catch (e) {
    console.log(`[ Broker - Error connceting to Broker ${e} ] `);
  }
}

module.exports={
    getClient
}
