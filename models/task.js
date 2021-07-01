const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    text: String, 
    day: String, 
    reminder: Boolean
});

module.exports = mongoose.model('Task', taskSchema);