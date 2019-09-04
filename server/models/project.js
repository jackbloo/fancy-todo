const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Missing Project name']
    } ,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    todo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todos'
    }]
},
{
    timestamps: true,
    versionKey: false
})

const projects = mongoose.model('projects', projectSchema)

module.exports = projects;