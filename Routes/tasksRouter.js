const express = require("express");
const router = express.Router();

const {
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  createTask,
} = require("../controllers/tasksController");

router.route("/tasks").get(getAllTasks).post(createTask);
router.route("/tasks/:id").get(getTask).patch(updateTask).delete(deleteTask);
module.exports = router;
