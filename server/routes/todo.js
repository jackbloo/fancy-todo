const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo')
const authorization = require('../middleware/authorization')
const projectAuth = require('../middleware/projectAuth')

router.post('/createTodo',todoController.createTodo)
router.get('/findTodo',todoController.find)
router.patch('/updateStatusTodo',authorization, todoController.update)
router.delete('/deleteTodo', authorization,todoController.delete)
router.get('/getProfile', todoController.getProfile)
router.get('/donelist', todoController.done)
router.get('/undonelist', todoController.undone)
router.patch('/updateProjectStatus', projectAuth, todoController.pUpdate)
router.delete('/deleteProjectTodo', projectAuth,todoController.pDelete)

module.exports = router;