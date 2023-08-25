const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
        // or // res.status(200).json({ tasks,amoutn:task.length }) or
        // res.status(200).json({ status: 'success', data: { tasks, nbHits: tasks.length } })
        // res.status(500).json({ msg: error });

})

const createTasks = asyncWrapper(async(req, res) => {

    const task = await Task.create(req.body)
    res.status(201).json({ task })
        // res.status(500).json({ msg: error }); //to get the error message of the task is
})

const getTasks = asyncWrapper(async(req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task }) // if some characters are missing in the url then it will show the error
        // res.status(500).json({ msg: error }) // if some characters are unknown added to url then it will show the error
})

const updateTasks = asyncWrapper(async(req, res) => {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true }) // to check new and run validators if remove them then get the old data
    if (!task) { return next(createCustomError(`No task with id : ${taskID}`, 404)) }
    res.status(200).json({ task })
        // res.status(500).json({ msg: error })
})

const deleteTasks = asyncWrapper(async(req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    // res.status(200).json({ task: null, status: 'success' }) or
    // res.status(404).send() or
    res.status(200).json({ task })
        // res.status(500).json({ msg: error })

})

// optional

// const editTasks = async(req, res) => { // remove default=true to see the change
//     try {
//         const { id: taskID } = req.params

//         const task = await Task.findOneAndUpdate({ _id: taskID },
//                 req.body, { new: true, runValidators: true, overwrite: true }) // to check new and run validators if remove them then get the old data
//         if (!task) { res.status(200).json({ msg: `No task with id : ${taskID}` }) }
//         res.status(200).json({ task })
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }


module.exports = { getAllTasks, createTasks, getTasks, updateTasks, deleteTasks, }
    // editTasks optional