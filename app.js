// const {launchPlayer} = require('./controllerPlayer/player')
const {client} = require('./broker/index')

async function main (){
    console.log('[ Verificando Conexiones ]');
    await launchPlayer()
}

main()
