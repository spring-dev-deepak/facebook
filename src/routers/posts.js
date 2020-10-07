const express = require('express')
const Post = require('../models/posts')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/new', auth, async (req, res) => {
    try{
        const post = new Post({
            ...req.body,
            owner: req.user._id
        })

        await post.save()
        res.status(201).send(post)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/posts', auth, async (req, res) => {
    try{
        // const posts = await Post.find({ owner: req.user._id })
        await req.user.populate('posts').execPopulate()

        res.send(req.user.posts)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router