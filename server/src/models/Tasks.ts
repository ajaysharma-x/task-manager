import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);
