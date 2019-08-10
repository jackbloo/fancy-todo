if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const routerTodo = require('./routes/todo')
const cors = require('cors')
const routerUser = require('./routes/user')
const authentication = require('./middleware/authentication')


app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoose.connect('mongodb://localhost/FancyTodo',{useNewUrlParser: true}).then(success => {
    console.log('Connection success')
}).catch(err => {
    console.log(err.message)
})

app.use(cors())


app.use('/user', routerUser)
app.use(authentication)
app.use('/todo', routerTodo)




//ERROR HANDLER
app.use(function(err,req,res,next){
    res.json({
        message: err.message,
        status: res.statuscode || 500
    })
})
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`))