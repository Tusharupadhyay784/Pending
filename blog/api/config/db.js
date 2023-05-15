const mongoose = require("mongoose")

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log("Connected to MongoDB".bgGreen.white)
    } catch (error) {
        console.log(error)
    }
}
module.exports = connection;