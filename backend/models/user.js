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
      "https://img.icons8.com/pastel-glyph/64/000000/user-male-circle.png",
  },

  newsArticle: { type: [mongoose.Schema.Types.ObjectId], ref: "NewsArticle" },

  remember: { type: Boolean },

  accessToken: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
