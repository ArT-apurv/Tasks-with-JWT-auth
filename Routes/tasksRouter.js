const express = require("express");
const router = express.Router();

const {
  login,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  createTask,
} = require("../controllers/tasksController");

router.route("/login").post(login);
router.route("/tasks").get(getAllTasks).post(createTask);
router.route("/tasks/:id").get(getTask).patch(updateTask).delete(deleteTask);
module.exports = router;
