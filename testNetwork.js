const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();

async function testUrl(serverStreaming){
    try {
        await exec(`ping -c 3 ${serverStreaming}` );
        return true
    } catch (error) {
        return false
    }
}

module.exports={
    testUrl,
}

