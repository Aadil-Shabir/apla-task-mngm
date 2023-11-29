const TaskModel = require("../models/TaskModel");

module.exports.getTask = async (req, res) => {
    const task = await TaskModel.find();
    res.send(task);
};

module.exports.saveTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTask = await TaskModel.create({ title, description });

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
    const { _id, title, description } = req.body;

    try {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")} ${currentDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}:${currentDate
            .getSeconds()
            .toString()
            .padStart(2, "0")}`;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    title,
                    description,
                    date: formattedDate,
                },
            },
            { new: true }
        );

        if (updatedTask) {
            res.send("Updated Successfully!");
        } else {
            res.status(404).send("Task not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
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
