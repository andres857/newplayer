const PlayerController = require('media-player-controller');
const {testUrl} = require('../testUrl')
require('dotenv').config()
// console.log('dotenv',process.env);

const server_Streaming = process.env.SERVER_STREAMING
const url_Streaming = process.env.URL_STREAMING
const url_StreamingOff = process.env.URL_STREAMINGOFF

let playerPlayStreaming = false

var player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: url_Streaming
  });

const closePlayer = function(){
    player.quit(e => {
        if(e) return console.error(e.message);
        playerPlayStreaming = false
        console.log('[ Player - Closing Media Player Streaming [ Server Streaming Multimedia NOT Available ] ]');
      })
  }

async function launch(){
    let statusServerStreaming = await testUrl(server_Streaming)
        if (statusServerStreaming && !playerPlayStreaming){

            player.launch(err => {
                if(err) return console.error(err.message);
                playerPlayStreaming = true
                console.log('[ Player - [ Server Streaming Multimedia Available ] ]');
                player.setVolume(0.2)

            });
            player.on('playback', data => console.log(data));
            // player.on('playback', data => console.log(data));

            // player.on('playback-started', () => {
            //     console.log('Playback started. Player can now be controlled');
            //     player.setVolume(0.5)
            // });
        }

        else if(!statusServerStreaming && playerPlayStreaming){

            player.quit(e => {
                if(e) return console.error(e.message);
                playerPlayStreaming = false
                console.log('[ Player - Closing Media Player Streaming [ Server Streaming Multimedia NOT Available ] ]');
              })

        }else if (!statusServerStreaming){
            console.log(`[ Player - Server Multimedia no Available ]`);
        }
}



module.exports={
    closePlayer,
    launch
}
