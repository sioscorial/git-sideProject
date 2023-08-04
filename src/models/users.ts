import mongoose from "mongoose";

interface IUser {
  name: string;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const user = mongoose.model<IUser>("user", userSchema);

export default user;
