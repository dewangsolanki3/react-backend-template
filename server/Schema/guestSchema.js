const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const Guest = new Schema({
  name: String,
  contact: Number,
  message: String
})

module.exports = mongoose.model( 'Guest' , Guest )