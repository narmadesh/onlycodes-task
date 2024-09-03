const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const taskDoc = await Task.create({
      name,
      description,
    });

    res.status(200).json(taskDoc);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const taskDoc = await Task.findById(id);
    await taskDoc.updateOne(req.body);

    res.status(200).json(taskDoc);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await Task.find(req.query)
      );
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const taskDoc = await Task.findById(id);
    res.status(200).json(taskDoc);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const taskDoc = await Task.findById(id);
    await taskDoc.deleteOne();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});
module.exports = router;
