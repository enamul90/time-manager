import mongoose, { Schema, models } from 'mongoose';

const workdaySchema = new Schema({
  workday: { type: String, required: true },
  userID: { type: String, required: true },
}, { timestamps: true });

const WorkDays = models.WorkDays || mongoose.model('WorkDays', workdaySchema);
export default WorkDays;