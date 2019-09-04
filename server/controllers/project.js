const project = require('../models/project')
const user = require('../models/user')

class projectController {
    static createProject(req, res, next) {
        let {
            id
        } = req.decode
        let {
            name
        } = req.body
        project.create({
            name
        }).then(data1 => {
            let myId = data1._id
            return project.findByIdAndUpdate(myId, {
                    $addToSet: {
                        user: id
                    }
                }, {
                    new: true,
                    runValidators: true
                })
                .then(data => {
                    res.status(201).json({
                        data
                    })
                })
        }).catch(next)
    }

    static deleteProject(req, res, next) {
        let {
            id
        } = req.params
        project.findByIdAndDelete(id)
            .then(data => {
                res.status(200).json({
                    data
                })
            }).catch(next)
    }

    static getMyProject(req, res, next) {
        let {
            id
        } = req.decode
        project.find()
            .then(data => {
                let filtered = data.filter(el => {
                    return el.user.includes(id)
                })
               res.status(200).json(filtered)

            }).catch(next)
    }

    static addMembers(req,res,next){
        let members = req.body['members[]']
        let {id} = req.params
        project.findByIdAndUpdate(id,{$addToSet:{user: {$each: members}}},{new:true, runValidators:true})
        .then(data => {
            res.status(200).json({
                data
            })
        }).catch(next)
    }
    static addTodo(req,res,next){
        let {todoId} = req.body
        let {id} = req.params
        project.findByIdAndUpdate(id, {$addToSet:{todo:todoId}}, {new:true,runValidators:true})
        .then(data => {
            res.send(data)
        })
    }
    
    static exitProject(req,res,next){
        let {id} = req.decode
        let projectId = req.params.id
        project.findByIdAndUpdate(projectId, {$pull:{user: id}},{new:true,runValidators:true})
        .then(data => {
            res.send(data)
        }).catch(next)
    }

    static allUsers(req,res,next){
        let {id} = req.decode
        user.find().then(data=>{
            let filtered = data.filter(el => {return el._id != id})
            res.send(filtered)
        })
    }

    static getTodo(req,res,next){
        let {id} = req.params
        project.findById(id).populate({path:'todo', options: {sort: {createdAt: -1}}})
        .then(data => {
            res.status(200).json({
                data
            })
        }).catch(next)
    }


}

module.exports = projectController;