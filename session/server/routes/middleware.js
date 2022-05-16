const loggedInCheck = (req,res,next) => {
    if(req.session.user){
        next()
    }else{
        res.status(401).send({
            message:'You are not logged in!'
        })
    }
}

const notLoggedInCheck = (req,res,next) => {
    if(req.session.user){
        res.status(401).send({
            message:'You are already logged in!'
        })
    }else{
        next()
    }
}

module.exports = {
    loggedInCheck,
    notLoggedInCheck
}