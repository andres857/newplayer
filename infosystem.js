const si = require('systeminformation');

async function load() {
    let {currentLoad} = await si.currentLoad()
    currentLoad = currentLoad.toFixed(2)
    return currentLoad
}

// async function Checksite(){
//     let Checksite = await si.inetChecksite('165.227.2.425')
//     return Checksite.ok
// }

async function serialPlayer(){
    let {serial} = await si.osInfo()
    return serial
}

async function getInterfaces(){
    let interfaces = await si.networkInterfaces()
    let ip4 = interfaces[1].ip4
    let MAC = interfaces[1].mac
    return network = {
        ip4,MAC
    }
}

// statusPlayer()

module.exports ={
    load,
    // Checksite,
    serialPlayer,
    getInterfaces
}
