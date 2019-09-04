module.exports = (req,res,next) => {
    const Todo = require('../models/todos')
    const id = req.decode.id
    const TodoId = req.body.id
    Todo.findById(TodoId).populate('projectId')
    .then(data => {
        if(data.projectId.user.includes(id)){
            next()
        } else {
            next({httpStatus: 401, message: 'You are not Authorized!!'})
        }
    }).catch(err => {
            next({httpStatus: 401, message: 'You are not Authorized!!'})
    })

}