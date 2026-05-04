const User = require("../models/registrationModel")
const bcrypt = require('bcrypt');

let registrationController = async (req, res) => {
    let { userName, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.send({
                success: false,
                message: 'User already exist.'
            })
        }

        if (!userName || !email || !password) {
            return res.send({
                success: false,
                message: "Fill the all field."
            })
        }
        const hash = bcrypt.hashSync(password, 10);

        let createUser = new User({
            userName: userName,
            email: email,
            password: hash
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

let loginController = async (req, res) => {
    let { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email: email })
        // if user not avaiable
        if (!existingUser) {
            return res.send({
                success: false,
                message: "User not found."
            })
        }
        // if user login already
        if (existingUser.isLogin == true) {
            return res.send({
                success: false,
                message: "Logout from another device."
            })
        }
        // password matching
        let pass = bcrypt.compareSync(password, existingUser.password)
        // login proccess
        if (pass) {
            existingUser.isLogin = true
            existingUser.save()
            return res.send({
                success: true,
                message: "Login successfully done."
            })
        } else {
            return res.send({
                success: false,
                message: "Invalid Credencial."
            })
        }
    } catch (error) {
        return res.send({
            success: false,
            message: "Server error."
        })
    }
}

let LogoutController = async (req, res) => {
    let { id } = req.body
    try {
        const existingUser = await User.findOne({ _id: id })
        existingUser.isLogin = false
        existingUser.save()
        return res.send({
            success: true,
            message: "Logout successfully done."
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Server error."
        })
    }
}

module.exports = { registrationController, loginController, LogoutController }