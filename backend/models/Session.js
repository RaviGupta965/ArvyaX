import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  tags: [String],
  json_file_url: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;