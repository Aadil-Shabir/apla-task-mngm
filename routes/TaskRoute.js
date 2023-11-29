const { Router } = require("express");
const { getTask, saveTask, updateTask, deleteTask } = require("../controllers/TaskController");

const router = Router();

router.get("/api/", getTask);
router.post("/api/save", saveTask);
router.put("/api/update", updateTask);
router.delete("/api/delete", deleteTask);

module.exports = router;
