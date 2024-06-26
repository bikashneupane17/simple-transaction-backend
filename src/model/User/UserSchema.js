import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, index: 1, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
