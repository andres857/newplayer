require('dotenv').config({ path: '/home/pi/newplayer/.env'})
const moment = require('moment');

const si = require('systeminformation');

const sala = process.env.SALA_DE_ESPERA;
const tv = process.env.TV

async function statusPlayer() {
    try {

      let {currentLoad} = await si.currentLoad()
      let {main}= await si.cpuTemperature()
      let interfaces = await si.networkInterfaces()
      let ip4 = interfaces[1].ip4
      let MAC = interfaces[1].mac
      currentLoad = currentLoad.toFixed(0)
      let status = 'connected'
      let lastseen = moment().format('MMMM Do YYYY, h:mm:ss a')
      return status = {
        status,currentLoad,main,ip4,MAC,lastseen
      }
    } catch (e) {
      console.log(`error obteniendo el status del player`);
    }
}

async function serialPlayer(){
    let {serial} = await si.osInfo()
    const serialplayer = serial.slice(0,6)
    console.log(serialplayer);
    return serialplayer
}

async function getInterfaces(){
    let interfaces = await si.networkInterfaces()
    let ip4 = interfaces[1].ip4
    let MAC = interfaces[1].mac
    return network = {
        ip4,MAC
    }
}

serialPlayer()

module.exports ={
    statusPlayer,
    serialPlayer,
    getInterfaces,
    sala,
    tv,
}
