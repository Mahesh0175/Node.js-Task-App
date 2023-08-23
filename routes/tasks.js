const express = require('express');
const router = express.Router();

const { getAllTasks, createTasks, getTasks, updateTasks, deleteTasks, } = require('../controllers/tasks'); //  editTasks --optional

router.route('/').get(getAllTasks).post(createTasks)
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks) //  editTasks --optional

module.exports = router;