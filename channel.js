require('dotenv').config()
const wchannelStreaming = process.env.URL_STREAMING_INSTITUCIONAL
const comercialStremaing = process.env.URL_STREAMING_COMERCIAL

const InstitutionalChannel = process.env.CHANNEL

let streaming = {
    wchannel : {
      url: wchannelStreaming ,
      channel: InstitutionalChannel
    },
    comercial : {
      url: comercialStremaing ,
      channel: "caracol" // Canal comercial por defecto
    },
    currentChannel :{
      url:'',
      channel:''
    } 
  }

module.exports = streaming
