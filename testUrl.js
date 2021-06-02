const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();

const server_Streaming = process.env.SERVER_STREAMING

async function testUrl(serverStreaming){
    try {
        await exec(`ping -c 3 ${serverStreaming}` );
        // console.log(`[ checkURL - Verificando Conexion con el Servidor Multimedia - Connected]`);
        return true
    } catch (error) {
      // console.log(`[ checkURL - Verificando Conexion con el Servidor Multimedia - Not Connected]`);
        return false
    }
}

// testUrl(server_Streaming)

module.exports={
    testUrl,
}
