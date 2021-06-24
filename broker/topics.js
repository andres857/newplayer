
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
          channel:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/channel`,
          request:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/request`,
        },
        publish:{
          status: `${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/status`,
          response: `${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/response`,
          currentStreaming: `${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/streaming`
        }
    }
    console.log(topics);
    return topics
}

module.exports={
    buildTopics,
}
