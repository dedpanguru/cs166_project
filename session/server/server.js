const express = require("express")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const { registerHandler, loginHandler, logoutHandler } = require("./routes/auth.js")
const { default: mongoose } = require("mongoose")

const app = express()

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
}))

const port = process.env.SERVER_PORT || 8888

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.post('/register', registerHandler)

app.post('/login', loginHandler)

app.post('/logout', logoutHandler)

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
