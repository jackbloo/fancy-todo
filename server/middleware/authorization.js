module.exports = (req,res,next) => {
    const Todo = require('../models/todos')
    const id = req.decode.id
    const TodoId = req.body.id
    Todo.findById(TodoId)
    .then(data => {
        if(data.UserId == id){
            next()
        }
    }).catch(err => {
            next(err)
    })

}