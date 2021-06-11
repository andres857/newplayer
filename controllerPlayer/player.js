const PlayerController = require('media-player-controller');
const {testUrl} = require('../testUrl')

require('dotenv').config()
// console.log('dotenv',process.env);

const server_Streaming = process.env.SERVER_STREAMING
const url_Streaming = process.env.URL_STREAMING
const url_StreamingOff = process.env.URL_STREAMINGOFF

let playerPlayGlobal = false
let playerplayEmisionAlterna = false
let currentStreaming = ""

var playerGeneral = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: url_Streaming
  });

var playerEmisionAlterna = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: url_StreamingOff
  });

// function to close player from web
const closePlayerGeneral = function(){
  playerGeneral.quit(e => {
      if(e) return console.error(`hola ${e.message}`);
      playerPlayGlobal = false
      console.log('[ PlayerGeneral - Closing Media Player Streaming from Web ]');
    })
}

const closeplayerEmisionAlterna = function(){
    playerEmisionAlterna.quit(e => {
        if(e) return console.error(`hola 2 ${e.message}`);
        playerplayEmisionAlterna = false
        console.log('[ PlayerAlterno - Closing Media Player Streaming from Web ]');
      })
  }

async function launch(){

    let statusServerStreaming = await testUrl(server_Streaming)
        console.log(`status server Streaming [ ${statusServerStreaming} ]`);

        if (statusServerStreaming) {

          if (playerplayEmisionAlterna) {
            playerplayEmisionAlterna = false
            console.log('[ Player - Closing Media Player Alterna [ Server Streaming Multimedia Available ] ]');
            playerEmisionAlterna.quit(e => {
                if(e) return console.error(`[ Player - Error iniciando reproductor ${e.message} ]`);
              })
          }

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

          if (playerPlayGlobal) {
            playerPlayGlobal = false
            console.log('[ Player - Closing Media Player Streaming [ Server Streaming Multimedia Not Available ] ]');
            playerGeneral.quit(e => {
                if(e) return console.error(`[ Player - Error iniciando reproductor ${e.message} ]`);
              })
          }else if (!playerPlayGlobal) {
            if (!playerplayEmisionAlterna) {
              playerEmisionAlterna.launch(err => {
                  if(err) return console.error(`Error iniciando reproductor ${err.message}`);
                  playerplayEmisionAlterna = true
                  currentStreaming = {
                    emision : "Alterna"
                  }
                  console.log(`currentStreaming - ${currentStreaming.emision}`);
                    // doPublishcurrentStreaming(client,topics,currentStreaming)
                  playerEmisionAlterna.setVolume(0.2)
              });
              playerEmisionAlterna.on('playback', data => console.log(data));
            }else{
              console.log(`the player already open`);
            }
          }
        }
}

launch()

module.exports={
    closeplayerEmisionAlterna,
    closePlayerGeneral,
    launch,
}
