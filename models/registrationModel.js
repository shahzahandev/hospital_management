const mongoose = require('mongoose')
const {Schema} = mongoose

let registrationSchema = new Schema ({

    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: [true, "Email is required."],
        trim: true,
        lowerCase: true,
        unique: true,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
      password:{
        type: String,
        required: true,
        min: [5, "To low"],
        max: [10, "To high"],
        // match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must be at least 8 characters and include uppercase, lowercase, and a number']

    },
    isLogin:{
        type: Boolean,
        default: false
    },
    photo:{
        type: String
    }
})

module.exports = mongoose.model('patient', registrationSchema)