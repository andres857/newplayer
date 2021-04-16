require('dotenv').config();

const serverBroker = process.env.SERVERBROKER 

const options = {
    connectTimeout:4000,
    clientId: 'laptopAndrestest',
    username:'emqx',
    password: 'public',
    keepalive:60,
    clean:true
}

module.exports={
    serverBroker,
    options
}



