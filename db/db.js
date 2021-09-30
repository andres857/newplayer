require('dotenv').config()
const db = require('mongoose');
const urldb = 'mongodb://desarrollo:8K9O1hMZiQOxbXTK@cluster0-shard-00-00.qvhzi.mongodb.net:27017,cluster0-shard-00-01.qvhzi.mongodb.net:27017,cluster0-shard-00-02.qvhzi.mongodb.net:27017/WindowsChannel?ssl=true&replicaSet=atlas-gpeftf-shard-0&authSource=admin&retryWrites=true&w=majority'
console.log(urldb);

db.Promise = global.Promise;

async function connect(urldb){
    await db.connect(urldb,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    console.log('[db conexion] successfull');
};

connect();

module.exports = {
    connect
}