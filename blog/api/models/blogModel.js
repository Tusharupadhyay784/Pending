const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String,
        required: [true, "Image is Required"]
    },
    // below user is for taking the individual blog as per particular user want to finds it
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'User id is Required']
    },



}, { timestamps: true })
const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;