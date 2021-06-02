const {launch} = require('./controllerPlayer/player')
const {doSubscription} = require('./broker/subscriptions')
const {doPublish} = require('./broker/publications')

require('dotenv').config()

async function main (){

    return await new Promise (resolve => {
        doSubscription()
        setInterval(()=>{
          // lanza el player y se verifica si el servidor multimedia esta activo cada x tiempo
          launch()
          // publica la informacion al broker
          doPublish()
        },25000)
    })
}

main()
