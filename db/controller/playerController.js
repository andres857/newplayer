const db = require('mongoose');
const playerModel = require ('../schema.js')
const player = require ('../../infosystem')
const {buildTopics} = require ('../../broker/topics')
var moment = require('moment');
// const urldb = "mongodb+srv://desarrollo:8K9O1hMZiQOxbXTK@cluster0.qvhzi.mongodb.net/Imbanaco?retryWrites=true&w=majority"
const urldb = "mongodb://desarrollo:8K9O1hMZiQOxbXTK@cluster0-shard-00-00.qvhzi.mongodb.net:27017,cluster0-shard-00-01.qvhzi.mongodb.net:27017,cluster0-shard-00-02.qvhzi.mongodb.net:27017/ValledeLiliSedeLimonar?ssl=true&replicaSet=atlas-gpeftf-shard-0&authSource=admin&retryWrites=true&w=majority"

async function connect(url){
    await db.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log('[DB conexion] successfull');
};

addPlayer = async ()=>{

    const idPlayerw = await player.serialPlayer();
    const idPlayer = idPlayerw.slice(0,6)
    const sala = player.sala;
    const tv = player.tv;
    const streaming = player.streaming;
    const network = await player.getInterfaces();
    const topics = await buildTopics();

    const date = moment().format('MMMM Do YYYY, h:mm:ss a')

    console.log(idPlayer,sala,tv,network,topics,date);

    const newPlayer = new playerModel({
        idPlayer:idPlayer,
        location: sala,
        tv:tv,
        ip: network.ip4,
        mac: network.MAC,
        streaming: streaming,
        topics : topics,
        lastseen : date
    });
    console.log(newPlayer)
    const playerSaved = await newPlayer.save();
    console.log(playerSaved)
}

// Verifica si el player ya esta creado, de lo contrario lo agrega
const createPlayer = async ()=>{
    const idPlayerw = await player.serialPlayer();
    const idPlayer = idPlayerw.slice(0,6)
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

getAllPlayers = async ()=>{
    const players = await playerModel.find()
    console.log(players)
}

getPlayer = async () => {
    const player = await playerModel.findOne({
        location: 'onco1'
    })
    console.log(player)
}

updatePlayer = async () => {
    const player = await playerModel.updateOne({
        idPlayer: '010101'
    },
    {
        lastseen: moment().format('MMMM Do YYYY, h:mm:ss a'),
    })
    console.log(player)
}

deletePlayer = async () =>{
    // const result = await playerModel.findByIdAndDelete('6103643a23ac6b10959f0af0')
    const result = await playerModel.deleteMany({ idPlayer: "2020" })
    console.log(result)
}


// (async ()=>{
//     await connect(urldb)
//     await createPlayer()
   
        
// })()

module.exports = {
    connect,
    createPlayer
}