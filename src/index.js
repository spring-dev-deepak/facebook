const express = require('express')
require('dotenv').config()
require('./db/mongoose')
const userRouter = require('./routers/user')
const postRouter = require('./routers/posts')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(postRouter)

app.listen(port, () => {
    console.log(`server upon running in ${port}`)
})