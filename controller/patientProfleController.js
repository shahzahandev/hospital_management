const PatientProfile = require("../models/userModel")

let patientProfileController = async(req, res) => {
    let {user, email, phoneNum, dob, gender, bloodGorup} = req.body

    let existingUser = await PatientProfile.findOne({email: email})

    if(existingUser){
        return res.send({
            success: false,
            message: "Patient already exist."
        })
    }

    let firstLetter = user.slice(0, 3)
    let ranNum = Date.now().toString()
    let id = firstLetter + ranNum.slice(-4)

    let profile = new PatientProfile ({
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
        message: 'Profile created successfully done.'
    })
}

module.exports = patientProfileController