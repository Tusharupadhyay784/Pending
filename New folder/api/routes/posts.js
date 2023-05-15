const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');


//CreatePost
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})



//UpdatePost
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// DeletePost
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                // await post.delete();
                await post.deleteOne();
                res.status(200).json("Post has been deleted");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
// GetPost
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})
// GetAll Post
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catname = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username: username });
        }
        else if (catname) {
            posts = await Post.find({
                categories: {
                    $in: [catname] // checking the particular categories
                }
            })
        }
        else {
            posts = await Post.find();
        }
        // const post = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;