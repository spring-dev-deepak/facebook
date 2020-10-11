const mongoose = require('mongoose')

mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('connect to db'))
.catch(e => console.log(e))