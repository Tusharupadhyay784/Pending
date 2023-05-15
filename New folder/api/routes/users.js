const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');


//Update
router.put('/:id', async (req, res) => {
    // checking the user is valid to update the profile or not
    if (req.body.userId === req.params.id) {
        console.log(1);
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("You can update only Your Account My Man")
    }
})


//Delete
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been Deleted");
            } catch (err) {
                res.status(500).json("User Not Found");
            }

        }
        catch (err) {
            res.status(500).json("User cannot Found");

        }
    }
    else {
        res.status(401).json("You can delete only Your Account My Man")
    }
})

// Get User
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;