const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();

async function testUrl(serverStreaming){
    try {
        console.log(`[ testUrl - Verificando Conexion con el Servidor Multimedia ]`);
        await exec(`ping -c 1 ${serverStreaming}` );
        return true
    } catch (error) {
        return false
    }
}

module.exports={
    testUrl,
}

