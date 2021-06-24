require('dotenv').config()
const PlayerController = require('media-player-controller');
const {doPublishCurrentStreaming} = require('../broker/publications')

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

// function to restart player from web
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

function launchPlayer(topics,client,streaming){

    console.log(`[ Player -------------- emision actual ${streaming} ]`);

    player.launch( err => {
      if(err) {
        return console.error(`[ Player - Error starting media player ${err.message} ] `);
      }else    
        player.load(streaming)
        player.setVolume(0.5)
      });

    player.on('playback', data => console.log(data));
}

  
module.exports={
    closePlayer,
    restartPlayer,
    launchPlayer,
    player
}

