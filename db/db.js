require('dotenv').config()
const db = require('mongoose');
const urldb = "mongodb+srv://desarrollo:8K9O1hMZiQOxbXTK@Cluster0.ywncf.mongodb.net/Valledelili?retryWrites=true&w=majority"
// console.log(urldb);


db.Promise = global.Promise;

async function connect(url){
    await db.connect(url,{
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