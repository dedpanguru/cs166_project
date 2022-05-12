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

schema.methods.canWithdraw = (amount) => {
    return this.balance - amount >= 0
}

module.exports = mongoose.model('Account',schema)