const JWT = require("jsonwebtoken");
require("dotenv").config();
const Task = require("../models/taskModels");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
      res.status(400).json({ msg: "Please provide username and password" });
    } else {
      const id = new Date().getDate();
      const token = JWT.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(200).json({ msg: "user created", token });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(201).json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      res.status(404).json({ msg: `No task with ID : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      res.status(404).json({ msg: `No task with ID : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json({ msg: `No task with ID : ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  login,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  createTask,
};
