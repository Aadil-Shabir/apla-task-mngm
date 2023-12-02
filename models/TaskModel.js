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
    recurrence: {
        type: {
            frequency: {
                type: String,
                enum: ["do not repeat", "daily", "weekly", "monthly", "yearly"],
                default: "do not repeat",
            },
            interval: {
                type: Number,
                default: 1,
            },
        },
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
