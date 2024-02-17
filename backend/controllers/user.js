import bcrypt from "bcryptjs";

import User from "../models/user.js";

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }

    const usernameConflict = await User.findOne({
      username: req.body.username,
      _id: { $ne: req.params.id },
    });
    if (usernameConflict) {
      return res.status(400).json({ message: "That username is taken!" });
    }

    const emailConflict = await User.findOne({
      email: req.body.email,
      _id: { $ne: req.params.id },
    });
    if (emailConflict) {
      return res
        .status(400)
        .json({ message: "That email is already registered!" });
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        newsArticle: req.body.newsArticle,
      },
      { new: true },
    ).populate("newsArticle");

    const { password, ...user } = updateUser._doc;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({ message: "Access denied!" });
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
