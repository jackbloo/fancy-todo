module.exports = (req,res,next) => {
    const Todo = require('../models/todos')
    const id = req.decode._id
    const TodoId = req.body._id
    Todo.findById({id: TodoId})
    .then(data => {
        if(data.UserId == id){
            next()
        }
    }).catch(err => {
            res.status(404)
            next(err)
    })

}