require('dotenv').config()
const wchannelStreaming = process.env.URL_STREAMING
const comercialStremaing = process.env.URL_STREAMING_COMERCIAL

let streaming = {
    wchannel : {
      url: wchannelStreaming ,
      channel: "Lili tv"
    },
    comercial : {
      url: comercialStremaing ,
      channel: "caracol"
    },
    current: {
      url:'',
      channel:''
    }
  }

module.exports = streaming
