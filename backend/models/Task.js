const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TaskSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = model("Task", TaskSchema);
module.exports = TaskModel;
