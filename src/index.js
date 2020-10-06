const express = require('express')
require('dotenv').config()
require('./db/mongoose')

const app = express()

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server upon running in ${port}`)
})