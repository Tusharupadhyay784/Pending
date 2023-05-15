const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')
//create user register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validations
        if (!username || !email || !password) return res.status(400).send({
            success: false,
            message: "Please Fill All Fields"
        })
        //existing user

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(401).send({
            success: false,
            message: "user is already Exists"

        })
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        //save new user
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "New User Created"
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ message: e.message, success: false })
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "All Users Data",
            data: users

        })
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: "Error to get All Users",
            error: e.message
        })
    }


}
//login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please Provide email or password"
            })

        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "credentials Not Valid"
            })

        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid Crendentials"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            user
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Error in Login Callback",
            e
        })
    }

}