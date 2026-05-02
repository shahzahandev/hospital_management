require('dotenv').config()
const express = require('express')
const registrationController = require('./controller/registrationController')
const dbConnection = require('./config/dbConnection')
const app = express()

app.use(express.json())
const port = process.env.PORT || 5000

dbConnection()

app.post('/registration', registrationController)


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);    
})

