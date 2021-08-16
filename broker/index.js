require('dotenv').config();
const MQTT = require("async-mqtt");
const {serialPlayer} = require('../infosystem')

const clientPlayer = process.env.CLIENT
const serverBroker = process.env.SERVERBROKER

async function buildOptions(){
    let idPlayerw = await serialPlayer()
    let idPlayer = idPlayerw.slice(0,6)

    const options = {
        clientId: `${clientPlayer}/player/${idPlayer}`,
        port: 1884,
        username:'emqx',
        password: 'public',
        keepalive:60,
        clean:true,
        reconnectPeriod: 10000,
        connectTimeout:4000,
        resubscribeOnReconnect: true
    }
    return options
}

async function connectBroker(){
  try {
    let options = await buildOptions()
    const client= await MQTT.connect(`mqtt://${serverBroker}`,options)
    return client
  } catch (e) {
    console.log(`[ Broker - Error connecting to Broker ${e} ] `);
    
  }
}

module.exports={
  connectBroker
}
