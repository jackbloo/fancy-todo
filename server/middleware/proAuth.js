module.exports = (req,res,next) => {
    const Project = require('../models/project')
    const id = req.decode.id
    const projectId = req.params.id
    Project.findById(projectId)
    .then(data => {
        if(data.user.includes(id)){
            next()
        } else {
            next({httpStatus: 401, message: 'You are not Authorized!!'})
        }
    }).catch(err => {
            next({httpStatus: 401, message: 'You are not Authorized!!'})
    })

}