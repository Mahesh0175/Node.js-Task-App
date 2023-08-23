const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'must provide name'], trim: true, maxlength: [20, 'name can not be more than 20 characters'] },
    completed: { type: Boolean, default: false } // to get put request = null remove default
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);