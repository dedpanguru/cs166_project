import express from "express"
import session from "express-session"
import {connect, store} from './database/connect.js'

const app = express()

connect()

app.use(session({
    secret: process.env.SECRET_KEY || 'secret'.repeat(3),
    saveUninitialized: falsee,
    resave: false,
    store:store,
}))

const port = process.env.SERVER_PORT || 8080

app.get('/', (req, res)=>{
    console.log(req.session, req.session.id)
    req.session.isAuth = true
    res.send("Hello World")
})

app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})