require('dotenv').config();
const MQTT = require("async-mqtt");
const {serialPlayer} = require('../infosystem')


const clientPlayer = process.env.CLIENT
const salaEspera = process.env.SALA_DE_ESPERA
const tv = process.env.TV
const serverBroker = process.env.SERVERBROKER



async function buildOptions(){
    let idPlayer = await serialPlayer()
    const options = {
        connectTimeout:4000,
        clientId: `${clientPlayer}/player/${salaEspera}/${tv}/${idPlayer}`,
        username:'emqx',
        password: 'public',
        keepalive:60,
        clean:true
    }
    return options
}


// console.log(options.clientId);

async function getClient(){
    let options = await buildOptions()
    console.log(options);
    return await MQTT.connectAsync(`mqtt://${serverBroker}`,options)
}

getClient()

module.exports={
    getClient
}
