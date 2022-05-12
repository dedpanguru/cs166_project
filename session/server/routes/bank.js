const User = require('../models/User.js')
const Account = require('../models/Account.js')

// all of these handlers presume user is logged in and they use session data

// see account from username
const myAccountHandler = async (req, res) => {
    let input = req.session.user
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
            "username": dbRecord.username,
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
const depositHandler = async (req, res) => {
    let username = req.session.user
    try{
        // get the User
        let dbRecord = await User.findOne({username:username})
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
        let amount = req.query.amount
        account.balance += Number(amount)
        await account.save()
        .then(_ => {
            res.status(200).send({
                message: `You have officially deposited $${amount}`
            })
        })
        .catch(err => {
            console.log(err.message)
            res.status(500).send({
                message: err.message
            })
        })
    } catch(err){
        console.error(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}
// transfer money
const transferHandler = async (req, res) => {
    let username = req.session.user
    let receiverName = req.query.receiver
    if (username === receiverName){
        res.status(400).send({
            message:'You cannot transfer money to yourself!'
        })
        return
    }
    try{
        // get the sender
        let sender = await User.findOne({username:username})
        if(!sender){
            console.log(`User with username ${username} not found in database`)
            res.status(400).send({
                message:'You are not a registered user!'
            })
            return
        }
        // find the account from the user id
        let sendingAccount = await Account.findOne({userid:sender.id})
        if(!sendingAccount){
            console.log(`Account with user id ${sender.id} not found`)
            res.status(400).send({
                message:'There is no account registered to this username!'
            })
            return
        }
        // get the receiving account
        let receiver = await User.findOne({username:receiverName})
        if(!receiver){
            console.log(`User with username ${receiverName} not found in database`)
            res.status(400).send({
                message:`${receiverName} is not a registered user!`
            })
            return
        }
        let receivingAccount = await Account.findOne({userid:receiver.id})
        if(!receivingAccount){
            console.log(`Account with user id ${receiver.id} not found`)
            res.status(400).send({
                message: `There is no account registered to ${receiverName}!`
            })
            return
        }
        // conduct the transfer
        let amount = req.query.amount
        if (Number(amount) == 'NaN'){
            res.status(422).send({
                message: `Couldn't understand request: ${amount} isn't a number`
            })
        }
        // only transfer if the sender can afford the transfer
        if (Number(sendingAccount.balance) - Number(amount) >= 0){
            sendingAccount.balance = Number(sendingAccount.balance) - Number(amount)
            await sendingAccount.save()
            console.log(`${username} balance = \$${sendingAccount.balance}`)
            receivingAccount.balance = Number(receivingAccount.balance) + Number(amount)
            await receivingAccount.save()
            console.log(`${receiver} balance = \$${receivingAccount.balance}`)
            res.status(200).send({
                message: `You have officially transferred \$${amount} to ${receiverName}`
            })
        } else {
            res.status(400).send({
                message: `Insufficient funds to transfer ${amount} from your current balance of ${sendingAccount.balance}`
            })
        }
    } catch(err){
        console.error(err.message)
        res.status(500).send({
            message: err.message
        })
    }
}
module.exports = {
    myAccountHandler,
    depositHandler,
    transferHandler
}