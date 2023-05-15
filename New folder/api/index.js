const express = require('express')
const app = express();
const connection = require('./Connection/connection')
const authRoute = require('./routes/authentications')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')
connection(); // for establishing connections

// below both are for taking and sending the data in the form of json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// File Uploading via Multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images')

    },
    filename: (req, file, callback) => {
        callback(null, 'image.jpeg')
    }
})
const upload = multer({storage:storage});
app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json("File has been Generated")
})
// File Uploading via Multer Above Code
//Routes
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/category', categoryRoute);



// server is running
app.listen(100, () => {
    console.log("Server is running on ....", 100);
})