const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController } = require('../controllers/blogController');


//router Object
const router = express.Router();


//Routes

// GET || all blogs
router.get('/all-blog', getAllBlogsController);


// POST || create blog
router.post('/create-blog', createBlogController);

// Update  || PUT

router.put('/update-blog/:id', updateBlogController);

// GET || single blog fetcher

router.get('/get-blog/:id', getBlogByIdController)

// Delete || delete
router.delete('/delete-blog/:id', deleteBlogController);


module.exports = router;