const User = require('../models/User.js')
const Account = require('../models/Account.js')

// all of these handlers presume user is logged in and uses session data

// see account from username
const myAccountHandler = async (req, res) => {
    let input = req.session.user || req.params.username
    try{
        // get the User
        let dbRecord = await User.findOne({username:input})
        if(!dbRecord){
            console.log(`User with username ${input} not found in database`)
            res.status(400).send({
                message:'You are not a registered user!'
            })
        }
        // find the account from the user id
        let account = await Account.findOne({userid:dbRecord.id})
        if(!account){
            console.log(`Account with user id ${dbRecord.id} not found`)
            res.status(400).send({
                message:'There is no account registered to this username!'
            })
        }
        // send account id and balance
        res.status(200).send({
            "accountID": account.id,
            "balance": account.balance
        })
    } catch(err){
        console.error(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}
// deposit money

// transfer money
