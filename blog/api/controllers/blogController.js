const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModels');
//Get ALl blogs
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        if (!blogs) return res.status(200).send({ success: false, message: "No Blogs Found" })
        return res.status(200).send({
            BlogCount: blogs.length,
            success: true,
            message: "All Blogs Lists",
            blogs
        })
    }

    catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Error while Getting Blog"
        })
    }
}

// createBlog

exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, userId } = req.body;
        //validation
        if (!title || !description || !image || !userId) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields"
            })
        }
        const existingUserId = await userModel.findById(userId);
        //validation
        if (!existingUserId) {
            return res.status(404).send({
                success: false,
                message: "Unable to find User"
            })
        }
        // these are making or taking blog as per individual User
        const newBlog = new blogModel({ title, description, image, userId });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session })
        existingUserId.blogs.push(newBlog);
        await existingUserId.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        // now its finish here
        return res.status(201).send({
            success: true,
            message: "Blog Created Successfully",
            newBlog
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Error while Creating Blog",
            e
        })
    }
}

// Update BLog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: "Blog Updated",
            blog
        })
        //validation
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Error while Updating Blog",
            e
        })
    }
}

//Single Blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) return res.status(201).send({
            success: false,
            message: "Blog Not Found"

        })
        return res.status(200).send({
            success: true,
            message: "Blog Found Successfully",
            blog
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Error while Getting Blog",
            e

        })
    }
}

// Delete || Blog
exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog2 = await blogModel.findByIdAndDelete(id).populate("User");
        // populate makes effect to others who connected with this database
        console.log(blog2)
        // await blog2.user.save();
        if (!blog2) return res.status(200).send({
            success: false,
            message: "Blog Not Found",
        })
        return res.status(200).send({
            success: true,
            message: "Blog Deleted Successfully",
            blog2
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Error While Deleting The Post",
            e
        })
    }
}