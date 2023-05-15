const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connections = require('./config/db');
const userRoute = require('./routes/userRoutes')
const blogRoute = require('./routes/blogRoutes')
// env config
dotenv.config();

//Rest Objects
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connections
connections();
//routes
app.use('/api/v1/users', userRoute)
app.use('/api/v1/blog', blogRoute)


//server
const PORT = process.env.PORT || 101
app.listen(PORT, () => {
    console.log(`Server is running on ...${PORT}`.bgMagenta.white,)
})