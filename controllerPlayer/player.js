require('dotenv').config()
const moment = require('moment');
const PlayerController = require('media-player-controller');
const {doPublishCurrentStreaming} = require('../broker/publications')

const url_Streaming = process.env.URL_STREAMING


var player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: url_Streaming
  });

// function to restart player from web
const restartPlayer = function(topics, client,reason){
  player.quit(e => {
      if(e) return console.error(`[ Player - Error closing media player ${e.message} ] `);
      console.log(`[ Player - Closing Media Player Streaming from ${reason} ]`);
    })

  setTimeout(()=>{
    player.launch(err => {
        if(err) return console.error(`[ Player - Error starting media player ${err.message} ] `);
          console.log(`[ player - restarted player Success]`);
          player.load(streaming.wchannel.url)
          player.setVolume(1)
          // let currentChannel = {
          //   restartVlc = 'success',
          //   emision:streaming,
          //   lastseen: moment().format('MMMM Do YYYY, h:mm:ss a')
          // }
  
          // doPublishCurrentStreaming(topics,client,currentChannel)
    });
  },3000)
}


function launchPlayer(topics, client , streaming){

    console.log(`[ Player - emision actual ${streaming.wchannel.channel} ]`);
    player.launch( err => {
      if(err) {
        return console.error(`[ Player - Error starting media player ${err.message} ] `);
      }else    
        player.load(streaming.wchannel.url)
        player.setVolume(1)
        console.log(`[ Player - Media player launched ]`);

        let currentChannel = {
          emision:streaming.wchannel.channel,
          lastseen: moment().format('MMMM Do YYYY, h:mm:ss a')
        }

        doPublishCurrentStreaming(topics,client,currentChannel)
      });

    player.on('playback', data => console.log(data));
}



  
module.exports={
    // closePlayer,
    restartPlayer,
    launchPlayer,
    player
}

