const User = require('../models/user')
const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/user', async (req, res) => {
    try{
        const user = new User(req.body)
        await user.save()

        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/me', auth, async (req, res) => {
    const allowedUpdates = ['name', 'password']
    const updates = Object.keys(req.body)
    const allowed = updates.every(update => allowedUpdates.includes(update))

    if(!allowed){
        return res.status(400).send({ error: 'Update not correct' })
    }

    try{
        updates.forEach(update => req.user[update] = req.body[update])

        await req.user.save()

        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
})

router.delete('/me', auth, async (req, res) => {
    try{
        await User.findOneAndDelete({ _id: req.user._id })
        
        res.send('Deleted')
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router