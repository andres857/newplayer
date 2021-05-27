require('dotenv').config();

const serverBroker = process.env.SERVERBROKER
const idplayer = process.env.IDPLAYER

const options = {
    connectTimeout:4000,
    clientId: idplayer,
    username:'emqx',
    password: 'public',
    keepalive:60,
    clean:true
}

module.exports={
    serverBroker,
    options
}
