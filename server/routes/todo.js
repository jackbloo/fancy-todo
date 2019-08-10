const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo')

router.post('/createTodo',todoController.createTodo)
router.post('/findTodo',todoController.find)
router.post('/updateStatusTodo',todoController.update)
router.post('/deleteTodo',todoController.delete)
router.post('/getProfile', todoController.getProfile)
router.post('/donelist', todoController.done)
router.post('/undonelist', todoController.undone)

module.exports = router;