const TaskModel = require("../models/TaskModel");

module.exports.getTask = async (req, res) => {
    const task = await TaskModel.find();
    res.send(task);
};

module.exports.saveTask = async (req, res) => {
    try {
        const { title, deadline } = req.body;

        const newTask = await TaskModel.create({ title, deadline });

        console.log("Added Successfully");
        console.log(newTask);

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

module.exports.updateTask = async (req, res) => {
    const { _id, title, deadline, completed } = req.body;

    try {
        const currentDate = new Date();

        const updatedTask = await TaskModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    title,
                    deadline,
                    date: currentDate,
                    completed,
                },
            },
            { new: true }
        );

        if (updatedTask) {
            res.json({ message: "Updated Successfully!" });
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.deleteTask = async (req, res) => {
    const { _id } = req.body;

    TaskModel.findByIdAndDelete(_id)
        .then((result) => {
            if (result) {
                res.send("Deleted Successfully!");
            } else {
                res.status(404).send("Task not found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
};
