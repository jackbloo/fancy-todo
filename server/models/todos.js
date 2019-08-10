const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name:{
        type: String,
        required: true
    } ,
    description: String,
    status: {
        type: String,
        default: 'Undone'
    },
    due_date: Date,
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
},
{
    timestamps: true,
    versionKey: false
})

const todos = mongoose.model('todos', todoSchema)

module.exports = todos;