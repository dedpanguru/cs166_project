const express = require("express")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const MongoDBStore = require("connect-mongodb-session")(session)
const User = require('./models/User.js')
const Account = require('./models/Account.js')

const app = express()

const store= new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 7,
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    }
})

app.use(express.json({extended:false}))

app.use(cookieParser())

app.use(session({
    secret: process.env.SECRET_KEY || 'secret'.repeat(3),
    saveUninitialized: true,
    resave: false,
    key: 'sid',
    cookie:{
        httpOnly: true,
        secure: true,
        maxAge:10*60*1000 
    },
    store: store
}))

const port = process.env.SERVER_PORT || 8080

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.post('/api/register', async (req, res) => {
    const [username, email, password] = req.body
    try{
        let dbRecord = await User.findOne({username})
        if (dbRecord){
            res.status(400).send({message: "Username taken!"})
        }
        // username not taken, so store it
        const user = new User({
            username,
            password, 
            email
        })
        //store user
        await user.save()
        res.redirect('/login')
    } catch(err){
        console.error(err.message)
        res.status(500).send({message: error.message})
    }
})
app.post('/api/login', async (req, res) => {
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
        // create and store account
        let account = new Account({
            id:user.accountid,
            userid:user.id,
            balance:0
        })
        await account.save()
        req.session.user=username
    } catch(err){
        console.log(`Error with registering: ${err}`)
        res.status(500).send({message:err.message})
    }
})

app.post('/api/logout',(req, res) => {
    if (!req.session.user && !res.session.sid){
        res.status(400).send({
            message:'You are not logged in'
        })
    }
    req.session.destroy()
    res.status(200).send({
        message:'You are officially logged out!'
    })
})

app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})