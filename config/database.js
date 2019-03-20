const mongoose = require('mongoose')
mongoose.connect(process.env.database_url, { useNewUrlParser: true })
