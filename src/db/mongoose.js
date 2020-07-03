const mongoose = require('mongoose')

//http methods for CRUD ==> Create(POST) - Read(GET) - Update(PATCH) - Delete(DELETE) 

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


