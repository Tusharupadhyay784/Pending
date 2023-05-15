const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

//Register

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10); // creating salts
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
        const savedUser = await newUser.save(); // saving the user in our user schema
        console.log(savedUser)
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})
//Login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(404).json("Wrong Credentials");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong Credentials");
        // below other parameter can be anything so we are taking all properties from user and send it to the users.Now
        // we dont want to send password to the user so for that we can do this thing below
        const { password, ...others } = user._doc
        console.log(user);
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);

    }
})

module.exports = router;