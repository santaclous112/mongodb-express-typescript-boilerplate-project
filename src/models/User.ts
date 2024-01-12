import mongoose, { Document, Model } from "mongoose";

interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  date: number;
  admin: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
  admin: {
    type: String,
    default: "client",
  },
});

const User: Model<UserDocument> = mongoose.model("User", userSchema);
export default User;
