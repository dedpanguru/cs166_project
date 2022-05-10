const express = require("express")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const MongoDBStore = require("connect-mongodb-session")(session)
const registerHandler = require("./routes/register.js")
const loginHandler = require('./routes/login.js')
const logoutHandler = require('./routes/logout.js')

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
    }
}))

const port = process.env.SERVER_PORT || 8080

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.post('/api/register', registerHandler)
app.post('/api/login', loginHandler)
app.post('/api/logout',logoutHandler)

app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})