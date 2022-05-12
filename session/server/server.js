const express = require("express")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const { registerHandler, loginHandler, logoutHandler } = require("./routes/auth.js")
const { default: mongoose } = require("mongoose")
const { myAccountHandler, depositHandler, transferHandler} = require('./routes/bank.js')
const crypto = require('crypto')
const uuid = require('node-uuid')
const { loggedInCheck, notLoggedInCheck } = require('./routes/middleware.js') 
const app = express()

app.use(express.json({extended:false}))

app.use(cookieParser())

app.use(session({
    secret: process.env.SECRET_KEY || 'secret'.repeat(3),
    saveUninitialized: true,
    resave: false,
    key: 'sid',
    cookie:{
        maxAge:10*60*1000 
    },
    genid: _ => {
        return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex");
    }
}))

const port = process.env.SERVER_PORT || 8888

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.post('/register', registerHandler)

app.post('/login', notLoggedInCheck, loginHandler)

app.post('/logout', loggedInCheck, logoutHandler)

app.get('/myaccount', loggedInCheck, myAccountHandler)

app.post('/deposit', loggedInCheck, depositHandler)

app.post('/transfer', loggedInCheck, transferHandler)

const url = process.env.DB_URL ? process.env.DB_URL : 'mongodb://username:password@host.docker.internal:27017/admin'

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(port, '0.0.0.0',()=>{
        console.log(`Server listening on http://localhost:${port}`)
    })
}
).catch(err => {
    console.log(`Error in connecting to DB: ${err}`)
})
