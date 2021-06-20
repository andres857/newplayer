const {launch} = require('./controllerPlayer/player')
const {doSubscription} = require('./broker/subscriptions')
require('dotenv').config()

async function main (){
    return await new Promise (resolve => {
         doSubscription()
         launch()

        setInterval(()=>{
          // lanza el player y se verifica si el servidor multimedia esta activo cada x tiempo
         launch()
       },120000)
    })
}

main()
