
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
        config:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/config`,
        urlStreaming:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/urlStreaming`,
        getStatus:`${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/getstatus`
        },
        publish:{
        network: `${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/network`,
        status: `${clientPlayer}/${sede}/players/${salaEspera}/${tv}/${idPlayer}/status`
        }
    }
    console.log(topics);
    return topics
}
buildTopics()
module.exports={
    buildTopics,
}
