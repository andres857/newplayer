const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();

async function testUrl(serverStreaming){
    try {
        console.log(`[ testUrl - Verificando Conexion con el Servidor Multimedia ]`);
        await exec(`ping -c 3 ${serverStreaming}` );
        
        return true
    } catch (error) {
        return false
    }
}
testUrl("192.168.5.223")
module.exports={
    testUrl,
}
