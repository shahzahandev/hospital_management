const User = require("../models/registrationModel")

let registrationController = async(req, res) => {
    let {userName, email, password} = req.body

    try {
        const existingUser = await User.findOne({email: email})
      
        if(existingUser){
            return res.send({
                success: false,
                message: 'User already exist.'
            })
        }

        if(!userName || !email || !password){
            return res.send({
                success: false,
                message: "Fill the all field."
            })
        }


        let createUser = new User({
            userName: userName,
            email: email,
            password: password
        })
        createUser.save()
        

        return res.send({
            success: true,
            message: "User created successfuly.",
            info: createUser,
        })

    } catch (error) {
       return res.send({
        success: false,
        message: "Server error",
        error: error
       }) 
    }
}

module.exports =  registrationController 