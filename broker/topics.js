
require('dotenv').config();
const {serialPlayer} = require('../infosystem')

const clientPlayer = process.env.CLIENT
const sede = process.env.SEDE
const salaEspera = process.env.SALA_DE_ESPERA
const tv = process.env.TV


async function buildTopics(){

    let idPlayer = await serialPlayer()

    const topics = {
        suscriber:{
          restart:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/restart`,
          urlStreaming:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/urlStreaming`,
          getStatus:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/getstatus`,
          getCurrentStreaming:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/getCurrentStreaming`

        },
        publish:{
          currentStreaming: `${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/currentStreaming`,
          status: `${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/status`,
        }
    }
    console.log(topics);
    return topics
}
buildTopics()
module.exports={
    buildTopics,
}
