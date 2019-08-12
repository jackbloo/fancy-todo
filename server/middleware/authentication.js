const {verifyToken} = require('../helpers/token')

function authentication(req,res,next){
    console.log(req.headers.token)
    try{
        const decode = verifyToken(req.headers.token)
        req.decode = decode
        next()
    } catch(err){
        res.status(403).json({
            message: 'Wrong token'
        })
    }
}

module.exports = authentication;