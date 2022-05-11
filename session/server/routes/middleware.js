const isLoggedIn = (req, res, next) => {
    if(req.session.user && res.session.sid){
        next()
    } else {
        res.status(401).send({
            message: 'You are not logged in!'
        })
    }
}

module.exports = {
    isLoggedIn
}