const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//posts routes
//all posts
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

//submit posts
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(400).json({
            message: err
        });
    }
});
//get specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        res.json({
            message: error
        });
    }

});

//delete post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({
            message: "post deleted!",
            deleted_post: removedPost
        });
    } catch (error) {
        res.json({
            message: error
        });
    }
});

//delete post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                title:  req.body.title
            }
        });
        res.status(200).json({
            message: "post updated!",
            updated_post: updatedPost
        });
    } catch (error) {
        res.json({
            message: error
        });
    }
});

module.exports = router;