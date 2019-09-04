const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project')
const proAuth = require('../middleware/proAuth')


router.post('/', projectController.createProject)
router.delete('/:id', proAuth, projectController.deleteProject)
router.get('/', projectController.getMyProject)
router.patch('/members/:id', proAuth, projectController.addMembers)
router.patch('/addTodo/:id', projectController.addTodo)
router.patch('/exitProject/:id', projectController.exitProject)
router.get('/allUsers', projectController.allUsers)
router.get('/allTodos/:id', projectController.getTodo)



module.exports = router;