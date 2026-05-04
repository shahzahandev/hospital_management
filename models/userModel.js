const mongoose = require('mongoose')
const { Schema } = mongoose

let userSchema = new Schema({

    patientId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
        lowerCase: true,
        unique: true,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNum: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'custom']
    },
    bloodGroup: {
        type: String,
        required: true
    },
    isHold: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Profile", userSchema)