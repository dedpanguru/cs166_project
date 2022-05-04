const express = require('express')
const session = require('express-session')

const TWO_HOURS = 1000 * 60 * 60 * 2
const{
    PORT = 3000,
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRET = 'secret',
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PRD = NODE_ENV === 'production'

const users = [
    {id: 1, name: 'user1', email: 'user@email.com', password: 'pass1'}
]

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if(!req.session.userId)
    {
        res.redirect('/login')
    }
    else{
        next()
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.userId)
    {
        res.redirect('/home')
    }
    else{
        next()
    }
}

app.use((req, res, next) => {
    const{userId} = req.session
    if(userId){
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
})

//HTML? Not needed? 
app.get('/', (req, res) => {
    const{userId} = req.session

    res.send(
        <h1>Welcome</h1>
    )
})

app.get('/home', redirectLogin, (req, res) => {
    const {user} = res.locals
    console.log(req.sessionID)
})

app.get('/login', redirectHome, (req, res) => {
    
})

app.get('/register', (req, res) => {


})

app.post('/login', redirectHome, (req, res) => {
    const{email,password} = req.body

    if(email && pasword){
        const user = users.find(
            user=>user.email === email && user.password === password
        )

        if(user){
            req.session.userId = user.id
            return res.redirect('/home')
        }
    }

    res.redirect('/login')
})

app.post('/register', redirectHome, (req, res) => {
    const{name, email, password} = req.body

    if(name && email && password)
    {
        const exists = users.some(
            user => user.emaill === email
        )
        if(!exists){
            const user = {
                id: users.length + 1,
                name, 
                email, 
                password
            }

            users.push(user)
            req.session.userId = user.id

            return res.redirect('/home')
        }
    }
    res.redirect('/register')
})

app.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect('/home')
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })

})

app.listen(PORT, () => console.log(
    `http://localhost:${PORT}`
))
