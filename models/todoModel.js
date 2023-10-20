const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the title"]
    },
    body: {
        type: String,
        required: [true, "Please add the body"]
    },
    checked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);