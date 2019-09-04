const express = require('express')
const router = express.Router()
const todo = require('../routes/todo')
const user = require('../routes/user')
const project = require('../routes/project')
const authentication = require('../middleware/authentication')
router.use('/user', user)
router.use(authentication)
router.use('/project',project)
router.use('/todo', todo)



module.exports = router