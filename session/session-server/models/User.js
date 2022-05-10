const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

schema.pre('save', async (next)=>{
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

schema.methods.comparePassword = async (input) => {
    return await bcrypt.compare(input, this.password)
}

exports.User = mongoose.model('user', schema)