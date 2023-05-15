const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, "Email is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    // below is for taking individula blogs taken by user
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog"

        }
    ]
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;