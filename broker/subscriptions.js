const {topics} = require('./index');

client.on('connect', function () {
    console.log(`Client Connected`);
    
    client.subscribe(topics.suscriber.config, function (err) {
        if (!err) {
            console.log(`subscription successfull to topic ${topics.suscriber.config}`);
            }
        })   
    client.subscribe(topics.suscriber.broadcast, function (err) {
        if (!err) {
            console.log(`subscription successfull to topic ${topics.suscriber.urlStreaming}`);
        }
    })
})

