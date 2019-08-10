require('dotenv').config()
var jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN

function generateToken(payload){
    return jwt.sign(payload, secret)
}

function verifyToken(token){
    return jwt.verify(token, secret)
}

module.exports = {
    generateToken,
    verifyToken
}