const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req, res) => {
    const match = {}
    const sort = {}

    //make the query boolean instead of string then make the match completed like it
    if(req.query.completed) match.completed = req.query.completed === 'true'

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id }) //first approach
        await req.user.populate({
            path: 'tasks',
            match, //used for filtering (like showing only the false or true tasks)
            options: { //used for paginating (limiting data for single page)
                limit: parseInt(req.query.limit), //for limit the data for single page
                skip: parseInt(req.query.skip), //for showing the 2nd or 3rd pages
                sort
            }
        }).execPopulate() //second approach
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})


router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task) return res.status(404).send()
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body) //take all keys and put them into an array
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({ error: 'invalid updates!' })

    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task) return res.status(404).send()

        updates.forEach((update) => task[update] = req.body[update])
        await task.save() //use these 3 lines not the commented one for using middleware for pre-save command
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
        if(!task) return res.status(404).send()

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router