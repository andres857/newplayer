const mongoose = require('mongoose');
const {Schema,model} = require ('mongoose');

const playerSchema = new Schema({
  idPlayer: String,
  currentChannel : Object,
  location: String,
  tv: String,
  ip: String,
  mac: String,
  streaming: Object,
  topics : Object,
  lastseen: String,
},{
  timestamps:true,
  versionKey:false
})

module.exports = model('player', playerSchema)



