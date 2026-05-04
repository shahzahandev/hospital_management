require('dotenv').config()
const express = require('express')
const {registrationController, loginController, LogoutController} = require('./controller/registrationController')
const dbConnection = require('./config/dbConnection')
const {patientProfileController, getAllProfile, singleProfile, setHoldProfile} = require('./controller/patientProfleController')
const app = express()

app.use(express.json())
const port = process.env.PORT || 5000

dbConnection()

app.post('/registration', registrationController)
app.post('/login', loginController)
app.post('/logout', LogoutController)

app.post('/profile', patientProfileController)
app.get('/allProfile', getAllProfile)
app.post('/singleProfile', singleProfile)
app.post("/setHold", setHoldProfile)


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);    
})

