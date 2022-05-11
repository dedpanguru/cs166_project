const User = require('../models/User.js')
const Account = require('../models/Account.js')
const bcrypt = require('bcrypt')
const crypto = require('crypto');


const loginHandler = async (req, res) => {
    if (req.session.user && res.session.sid){
        res.status(400).send({
            message: 'You are already logged in!'
        })
    } 
    const {username, password} = req.body
    try{
        const user = await User.findOne({username})
        if (!user){
            res.status(400).send({message:'User not found'})
        }
        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch){
            res.status(401).send({message:'Password doesn\'t match'})
        }
        req.session.touch()
        req.session.user=username
        res.status(200).send({
            message: 'You are officially logged in!'
        })
    } catch(err){
        console.log(`Error with registering: ${err}`)
        res.status(500).send({message:err.message})
    }
}

const logoutHandler = (req, res) => {
    if (!req.session.user && !res.session.sid){
        res.status(400).send({
            message:'You are not logged in'
        })
    }
    req.session.destroy()
    res.status(200).send({
        message:'You are officially logged out!'
    })
}

const registerHandler = async (req, res) => {
    try{
        let dbRecord = await User.findOne({username: req.body.username})
        if (dbRecord){
            res.status(400).send({message: "Username taken!"})
            return
        }
        // username not taken, so store it
        const user = new User({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
            email: req.body.email,
            id:crypto.randomBytes(16).toString('hex'),
            accountid:crypto.randomBytes(16).toString('hex'), 
        })
        //store user
        await user.save().catch(err => {
            console.error(err.message)
            res.status(500).send({message: `There was a problem in storing user data: ${err.message}`})
            return
        })
        // create and store account
        let account = new Account({
            id:user.accountid,
            userid:user.id,
            balance:0
        })
        await account.save().catch(err => {
            console.error(err.message)
            res.status(500).send({message: `There was a problem in creating an account: ${err.message}`})
            return
        })
        res.status(201).send({
            message:'You are offically registered!'
        })
    } catch(err){
        console.error(err.message)
        res.status(500).send({message: err.message})
    }
}
module.exports = {
    loginHandler,
    registerHandler,
    logoutHandler
}