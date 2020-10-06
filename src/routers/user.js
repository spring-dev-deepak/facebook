const User = require('../models/user')
const express = require('express')

const router = express.Router()

router.get('/user', async (req, res) => {
    res.send('facebook')
})


module.exports = router