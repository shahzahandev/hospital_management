const PatientProfile = require("../models/userModel")

let patientProfileController = async (req, res) => {
    let { user, email, phoneNum, dob, gender, bloodGorup } = req.body

    try {
        let existingUser = await PatientProfile.findOne({ email: email })

        if (existingUser) {
            return res.send({
                success: false,
                message: "Patient already exist."
            })
        }

        let firstLetter = user.slice(0, 3)
        let ranNum = Date.now().toString()
        let id = firstLetter + ranNum.slice(-4)

        let profile = new PatientProfile({
            user: user,
            email: email,
            patientId: id,
            phoneNum: phoneNum,
            dob: dob,
            gender: gender,
            bloodGroup: bloodGorup
        }).save()

        return res.send({
            success: true,
            message: `Profile created successfully done.`
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Server error.",
            error: error
        })
    }
}

let getAllProfile = async (req, res) => {
    try {
        let existingUser = await PatientProfile.find({})
        return res.send({
            success: true,
            message: "All patinet profile",
            data: existingUser
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Server error.",
            errro: error
        })
    }
}

let singleProfile = async (req, res) => {
    let { id } = req.body
    try {
        let singleData = await PatientProfile.findOne({ _id: id })
        return res.send({
            success: false,
            message: `${singleProfile.user}'s profile details.`,
            profile: singleData
        })
    } catch (error) {
        return res.send({
            success: true,
            message: "Server error.",
            error: error
        })
    }
}

let setHoldProfile = async (req, res) => {
    let { id } = req.body
    try {
        let holdItems = await PatientProfile.findOne({ _id: id })
        holdItems.isHold = true
        holdItems.save()
        return res.send({
            success: true,
            message: `${holdItems.user} 's profile holded.`
        })
    } catch (error) {
        return res.send({
            success: false,
            message: "Server error.",
            error: error
        })
    }
}

module.exports = { patientProfileController, getAllProfile, singleProfile, setHoldProfile }