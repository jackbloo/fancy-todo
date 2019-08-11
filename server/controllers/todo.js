require('dotenv').config()
const Todo = require('../models/todos')

class TodoController {
    static createTodo(req, res, next) {
        let {
            id
        } = req.decode
        const {
            name,
            description,
            due_date
        } = req.body
        Todo.create({
            name,
            description,
            due_date,
            UserId: id
        }).then(data2 => {
            res.status(201).json({
                data2
            })
        }).catch(err => {
            next(err)
        })

    }
    static find(req, res, next) {
        const {
            id
        } = req.decode
        Todo.find({
                UserId: id
            })
            .then(data => {
                res.status(200).json({
                    data
                })
            }).catch(err => {
                res.status(404)
                next(err)
            })
    }
    static update(req, res, next) {
        let {
            id
        } = req.body
        let updatedData = {}
        req.body.name && (updatedData.name = req.body.name)
        req.body.description && (updatedData.description = req.body.description)
        req.body.status && (updatedData.status = req.body.status)
        req.body.due_date && (updatedData.due_date = req.body.due_date)
        Todo.findByIdAndUpdate(id, updatedData, {
                new: true,
                runValidators: true
            })
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(500)
                next(err)
            })
    }
    static delete(req, res, next) {
        let {
            id
        } = req.body
        Todo.findByIdAndDelete(id)
            .then(data => {
                res.status(200).json({
                    data
                })
            }).catch(err => {
                res.status(500)
                next(err)
            })
    }

    static getProfile(req, res, next) {
        let {
            name
        } = req.decode
        res.json({
            name
        })
    }

    static undone(req, res, next) {
        const {
            id
        } = req.decode
        Todo.find({
                UserId: id,
                status: 'Undone'
            })
            .then(data => {
                res.status(200).json({
                    data
                })
            }).catch(err => {
                res.status(404)
                next(err)
            })
    }

    static done(req, res, next) {
        const {
            id
        } = req.decode
        Todo.find({
                UserId: id,
                status: 'Done'
            })
            .then(data => {
                res.status(200).json({
                    data
                })
            }).catch(err => {
                res.status(404)
                next(err)
            })
    }
}


module.exports = TodoController;