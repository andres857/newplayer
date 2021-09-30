
require('dotenv').config();
const {serialPlayer} = require('../infosystem')

const clientPlayer = process.env.CLIENT
const sede = process.env.SEDE
const salaEspera = process.env.SALA_DE_ESPERA
const tv = process.env.TV


async function buildTopics(){

    let idPlayerw = await serialPlayer()
    let idPlayer = idPlayerw.slice(0,6)
    const topics = {
        suscriber:{
          channel:`players/channel`,
          restart:`players/restart`,
          request:`players/${idPlayer}/request`,
        },
        publish:{
          status: `players/${idPlayer}/status`,
          response: `players/${idPlayer}/response`,
          currentStreaming: `players/${idPlayer}/streaming`
        }
    }
    console.log(topics)
    return topics
}

module.exports={
    buildTopics,
}
