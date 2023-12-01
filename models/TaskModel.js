const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: function () {
            const currentDate = new Date();
            return currentDate;
        },
    },
});

module.exports = mongoose.model("Task", taskSchema);
