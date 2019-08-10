const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/signin', userController.signIn)
router.post('/Gsignin', userController.GsignIn)
router.post('/register', userController.register)




module.exports = router;