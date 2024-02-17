import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address!",
    },
  },

  password: { type: String, required: true },

  profilePicture: {
    type: String,
    default:
      "https://img.icons8.com/parakeet-line/48/FFFFFF/user-male-circle.png",
  },

  remember: { type: Boolean },

  accessToken: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
