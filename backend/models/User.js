import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
export default User;