const mongoose = require("mongoose")

const Schema = mongoose.Schema

const NameOf_Schema_NoMatter = new Schema({
    username:{
        type: String,
        required:true
    },
    useremail:{
        type: String,
        required:true
    },
    usermsg:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: new Date()
    }
})

const Bio = mongoose.model('Bio' , NameOf_Schema_NoMatter)
module.exports = Bio;

