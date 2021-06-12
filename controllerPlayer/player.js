const PlayerController = require('media-player-controller');
const {testUrl} = require('../testUrl')

require('dotenv').config()
// console.log('dotenv',process.env);

const server_Streaming = process.env.SERVER_STREAMING
const url_Streaming = process.env.URL_STREAMING
// const url_StreamingOff = process.env.URL_STREAMINGOFF

let playerPlayGlobal = false
let currentStreaming = ""

var playerGeneral = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: url_Streaming
  });

// function to close player from web
const closePlayerGeneral = function(){
  playerGeneral.quit(e => {
      if(e) return console.error(`hola ${e.message}`);
      playerPlayGlobal = false
      console.log('[ PlayerGeneral - Closing Media Player Streaming from Web ]');
    })
}

async function launch(){

    let statusServerStreaming = await testUrl(server_Streaming)
        console.log(`status server Streaming [ ${statusServerStreaming} ]`);

        if (statusServerStreaming) {

          console.log('[ Player - [ Server Streaming Multimedia Available ] ]');
          if (!playerPlayGlobal) {
            playerGeneral.launch(err => {
                if(err) return console.error(`Error iniciando reproductor ${err.message}`);
                playerPlayGlobal = true
                currentStreaming = {
                  emision : "General"
                }
                console.log(`currentStreaming - ${currentStreaming.emision}`);
                  // doPublishcurrentStreaming(client,topics,currentStreaming)
                playerGeneral.setVolume(0.2)
            });
            playerGeneral.on('playback', data => console.log(data));
          }
        }else if (!statusServerStreaming) {
          closePlayerGeneral()
        }
}

launch()

module.exports={
    closePlayerGeneral,
    launch,
}
