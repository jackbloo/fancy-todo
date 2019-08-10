const {encrypt} = require('../helpers/hash')
const {decrypt} = require('../helpers/hash')
const {generateToken} = require('../helpers/token')
const axios = require('axios')
require('dotenv').config()
const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static GsignIn(req,res,next){
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID,
          }).then(ticket => {
            const payload = ticket.payload;
            return User.findOne({
                    email: payload.email        
            }).then(result => {
                if(!result){
                    return User.create({
                        name: payload.name,
                        email: payload.email,
                        password: encrypt(process.env.PASSWORD)
                    })
                } else {
                    return result
                }
            }).then(user => {
                let dataUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                let token = generateToken(dataUser)
                res.json({
                    token
                })
            })
          }).catch(err => {
            next(err)
          })
    }

    static signIn(req,res){
        const {email, password} = req.body
        User.findOne({
            email: email
        }).then(user => {
            if(user){
                if(decrypt(password,user.password)){
                    const payload = {
                        id: user.id,
                        name:user.name,
                        email:user.email
                    }
                    const token = generateToken(payload)
                    res.status(200).json({
                        token: token
                    })
                }else{
                    res.status(404)
                    nex(err)
                }
            } else{
                res.status(404)
                nex(err)
            }
        })
    }
    static register(req,res,next){
            const {name, email, password} = req.body
            User.create({
                name, email, password: encrypt(password)
            }).then(data => {
                res.status(201).json({
                    message: 'Akun Berhasil Terbuat'
                })
            }).catch(err => {
                next(err)
                })
    }



    
}

module.exports = UserController;