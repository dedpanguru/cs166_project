const User = require('../models/User.js')

const registerHandler = async (req, res) => {
    const [username, password] = req.body
    try{
        let dbRecord = await User.findOne({username})
        if (dbRecord){
            res.status(400).send({message: "Username taken!"})
        }
        // username not taken, so store it
        let user = new User({
            username,
            password
        })
        //store user
        await user.save()
        res.redirect('/login')
    } catch(err){
        console.error(err.message)
        res.status(500).send({message: error.message})
    }
}

exports.registerHandler = registerHandler