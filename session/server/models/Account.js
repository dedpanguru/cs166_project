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

schema.methods.deposit = (amount) => {
    this.balance += amount
}

schema.methods.withdraw = (amount) => {
    if((this.balance - amount) >= 0){
        this.balance -= amount
        return true
    } 
    return false
}

module.exports = mongoose.model('Account',schema)