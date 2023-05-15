const dotenv = require('dotenv')
const mongoose = require('mongoose')


async function connection() {
    try {
        await mongoose.connect(dotenv.config().parsed.MONGO_URL)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connection;
