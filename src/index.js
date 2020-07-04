const app = require('./app')
const port = process.env.PORT

app.listen(port, ()=> {
    console.log('server is listening on port ' + port)
})

//hashing algorithms aren't reversable (one-way algorithm)
//encrypting algorithms are reversable

//config/dev.env used to set enviroment variables with help of env-cmd package
//without any require on files ==> just by editing the dev script to run the environment file first



// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: { //to add the maximum size for the file
//         fileSize: 1000000 //equals 1mb ==> it calculates in bytes
//     },
//     fileFilter(req, file, cb){ //to accept certain extensions only
//         if(!file.originalname.match(/\.(doc|docx)$/)){ //it's reqular expression
//             return cb(new Error('Please upload a word document'))
//         }
//         cb(undefined, true) //means accepting the file
//     }
// })
// app.post('/upload', upload.single('upload'), (req, res) => { //('upload') ==> the key for uploading the file
//     res.send()
// })




// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5efdd753cd2aeb1ea4687388')
//     // await task.populate('owner').execPopulate() //show all the data of the user(the connected with ref)
//     // console.log(task.owner)

//     const user = await User.findById('5efdd734cd2aeb1ea4687385')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()