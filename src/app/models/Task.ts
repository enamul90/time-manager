import mongoose, { Schema, models } from 'mongoose';

const taskSchema = new Schema({
  workID: { type: String, },
  tittle: { type: String, },
  time: { type: String, },
  description : { type: String, },

}, { timestamps: true });

const Task = models.Task || mongoose.model('Task', taskSchema);
export default Task;