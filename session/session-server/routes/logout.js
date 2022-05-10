const logoutHandler = (req, res) => {
    if (!req.session.user && !res.session.sid){
        res.status(400).send({
            message:'You are not logged in'
        })
    }
    req.session.destroy()
    res.status(200).send({
        message:'You are officially logged out!'
    })
}

exports.logoutHandler = logoutHandler