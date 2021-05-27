const {testUrl} = require('../testUrl')
const PlayerController = require('media-player-controller');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const server_Streaming = process.env.SERVER_STREAMING
const url_Streaming = process.env.URL_STREAMING
const url_StreamingOff = process.env.URL_STREAMINGOFF

let playerPlayStreaming = false

var player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: url_Streaming
  });

async function launch(){
    let statusServerStreaming = await testUrl(server_Streaming)

        if (statusServerStreaming && !playerPlayStreaming){

            player.launch(err => {
                if(err) return console.error(err.message);
                playerPlayStreaming = true
                console.log('[ Player - Reproductor lanzado ]');
            });

            player.on('playback-started', () => {
                console.log('Playback started. Player can now be controlled');
                player.setVolume(0.1)
            });

            player.on('playback', data => console.log(data));
        }
        else if(!statusServerStreaming && playerPlayStreaming){

            player.quit(e => {
                if(e) return console.error(e.message);
                playerPlayStreaming = false
                console.log('[ Player - Cerrando reproductor ]');
              })

        }else if (!statusServerStreaming){
            console.log("sin conexion al servidor multimedia");
        }
}

async function launchPlayer(){
    return await new Promise (resolve => {
        setInterval(()=>{
            launch()
        },5000)
    })
}
launchPlayer()
module.exports={
    launchPlayer
}
