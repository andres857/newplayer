require('dotenv').config()

const PlayerController = require('media-player-controller');
const {doPublishStatusPlayer} = require('../broker/publications')

const {testUrl} = require('../testUrl')

const server_Streaming = process.env.SERVER_STREAMING
const url_Streaming = process.env.URL_STREAMING
let currentStreaming = {
  emision : "wchannel"
}

let playerPlay = false

var player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: url_Streaming
  });

// function to close player from web
const restartPlayer = function(reason){
  player.quit(e => {
      if(e) return console.error(`[ Player - Error closing media player ${e.message} ] `);

      playerPlay = false
      console.log(`[ Player - Closing Media Player Streaming from ${reason} ]`);
    })

  setTimeout(()=>{
    player.launch(err => {
        if(err) return console.error(`[ Player - Error starting media player ${err.message} ] `);

        playerPlay = true
        currentStreaming = {
          emision : "wchannel"
        }
        console.log(`[ player - restart player]`);
        console.log(`[ Player - CurrentStreaming ${currentStreaming.emision} ]`);
          // doPublishcurrentStreaming(client,topics,currentStreaming)
        player.setVolume(0.2)
    });
  },3000)
}

const closePlayer = function(reason){
  if (playerPlay) {
    player.quit(e => {
        if(e) return console.error(`[ Player - Error closing media player ${e.message} ] `);

        playerPlay = false
        console.log(`[ Player - Closing Media Player Streaming from ${reason} ]`);
      })
  }else {
    console.log(`[ Player - media player closed, nothing for do ]`);
  }

}

async function launch(topics,client){

    let statusServerStreaming = await testUrl(server_Streaming)
        console.log(`[ Player - Status server Streaming ${statusServerStreaming} ] `);

        if (statusServerStreaming) {

          console.log(`[ Player - Server Streaming Multimedia Available - Current Streaming ${currentStreaming.emision} ]`);
          
          doPublishStatusPlayer(client,topics.publish.status)
          if (!playerPlay) {
            player.launch(err => {
                if(err) return console.error(`[ Player - Error starting media player ${err.message} ] `);

                playerPlay = true
                currentStreaming = {
                  emision : "wchannel"
                }
                console.log(`[ Player - CurrentStreaming ${currentStreaming.emision} ]`);
                // doPublishcurrentStreaming(client,topics,currentStreaming)
                player.setVolume(0.2)
            });
            player.on('playback', data => console.log(data));
          }
        } else if (!statusServerStreaming) {
          closePlayer('Media player not Available')
        }
}


module.exports={
    closePlayer,
    restartPlayer,
    launch,
}

