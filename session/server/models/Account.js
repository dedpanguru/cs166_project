const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    userid:{
        type:String,
        required:true,
        unique:true
    },
    balance:{
        type: Number,
        required:true
    }
})

module.exports = mongoose.model('Account',schema)