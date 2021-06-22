require('dotenv').config();
const MQTT = require("async-mqtt");
const {serialPlayer} = require('../infosystem')


const clientPlayer = process.env.CLIENT
const serverBroker = process.env.SERVERBROKER



async function buildOptions(){
    let idPlayer = await serialPlayer()
    const options = {
        clientId: `${clientPlayer}/player/${idPlayer}`,
        username:'emqx',
        password: 'public',
        // protocolVersion: 5,
        keepalive:60,
        clean:true,
        reconnectPeriod: 1000,
        connectTimeout:4000,
        resubscribeOnReconnect: true

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
