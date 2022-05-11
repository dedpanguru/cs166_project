const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const schema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    accountid:{
        type:String,
        unique:true,
        required:true
    }
})

schema.pre('save', async (next)=>{
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    this.id = crypto.randomBytes(16).toString('hex')
    this.accountid = crypto.randomBytes(16).toString('hex')
    next()
})

schema.methods.comparePassword = async (input) => {
    return await bcrypt.compare(input, this.password)
}

exports.User = mongoose.model('User', schema)