const mongoose = require('mongoose');

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
schema.methods.getUserByUserName = (username) => {
    return User.findOne({username:username})
}
module.exports = mongoose.model('User', schema)