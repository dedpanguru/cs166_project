const User = require('../models/User.js')

const loginHandler = async (req, res) => {
    if (req.session.user && res.session.sid){
        res.status(400).send({
            message: 'You are already logged in!'
        })
    } 
    const [username, password] = req.body
    try{
        const user = await User.findOne({username})
        if (!user){
            res.status(400).send({message:'User not found'})
        }
        const passMatch = await user.comparePassword(password)
        if (!passMatch){
            res.status(401).send({message:'Password doesn\'t match'})
        }
        req.session.user=username
    } catch(err){
        console.log(`Error with registering: ${err}`)
        res.status(500).send({message:err.message})
    }
}

exports.loginHandler = loginHandler