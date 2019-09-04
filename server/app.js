if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config();
}
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./helpers/errorhandler')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoose.connect(process.env.LINK,{useNewUrlParser: true}).then(success => {
    console.log('Connection success')
}).catch(err => {
    console.log(err.message)
})


app.use('/', router)




//ERROR HANDLER
app.use(errorHandler)
  

app.listen(port, () => console.log(`Example app listening on port ${port}!`))