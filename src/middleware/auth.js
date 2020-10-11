const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const verified = await jwt.verify(token, process.env.JWTSECRET)
        const user = await User.findOne({ _id: verified._id })

        if(!user){
            throw new Error()
        }

        req.user = user
        next()
    }catch(e){
        res.status(401).send({error: 'Unauthenticated'})
    }
}

module.exports = auth