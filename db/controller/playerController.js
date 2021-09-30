const db = require('mongoose');
const playerModel = require ('../schema.js')
const player = require ('../../infosystem')
const {buildTopics} = require ('../../broker/topics')
const streaming =  require ('../../channel')
var moment = require('moment');


async function connect(url){
    try {
        await db.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        console.log('[ DB - Connection Successfull ]');
    } catch (error) {
        console.log(`[ DB - Error connecting to DB: ${error} ]`);
    }
    
};

addPlayer = async ()=>{

    const idPlayer = await player.serialPlayer();
    const sala = player.sala;
    const tv = player.tv;
    const network = await player.getInterfaces();
    const topics = await buildTopics();
    const date = moment().format('MMMM Do YYYY, h:mm:ss a')


    const newPlayer = new playerModel({
        idPlayer:idPlayer,
        currentChannel : {
            url: 'rtsp://inicial',
            channel: streaming.wchannel.channel
        },
        location: sala,
        tv:tv,
        ip: network.ip4,
        mac: network.MAC,
        topics : topics,
        lastseen : date
    });

    const playerSaved = await newPlayer.save();
    console.log(playerSaved)
}

// Verifica si el player ya esta creado, de lo contrario lo agrega
const createPlayer = async ()=>{
    
    const idPlayer = await player.serialPlayer()
    const players = await playerModel.find();
    // console.log(players);

    const playerfound = players.find(element => element.idPlayer === idPlayer)
    if (playerfound === undefined) {
            (async function(){
                await addPlayer(); 
                console.log('[ DB - Player has been successfully created ]');
                })()
        }else{
            console.log('[ DB - Player already exist ]');
        }
}

updateChannel = async (channel) => {
    idPlayer = await player.serialPlayer()
    const playerUpdate = await playerModel.updateOne({
        idPlayer: idPlayer
        },
    {
        currentChannel: {
            url: 'https://windows',
            channel: channel
        },
    })
    console.log(playerUpdate)
}



// (async ()=>{
//     await connect('mongodb://desarrollo:8K9O1hMZiQOxbXTK@cluster0-shard-00-00.qvhzi.mongodb.net:27017,cluster0-shard-00-01.qvhzi.mongodb.net:27017,cluster0-shard-00-02.qvhzi.mongodb.net:27017/WindowsChannel?ssl=true&replicaSet=atlas-gpeftf-shard-0&authSource=admin&retryWrites=true&w=majority')    
//     await updateChannel('esp2nd')       
//     })()

module.exports = {
    connect,
    createPlayer
}