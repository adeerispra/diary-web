import User from "../models/user.model.js";
import { Pass_RegEx } from "../utils/constant.util.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  const userID = req.user._id;

  try {
    let user = await User.findById(userID).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getUserProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { name, nickname, newPassword, currentPassword } = req.body;
  const userID = req.user._id;

  try {
    let user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      } else {
        if (!Pass_RegEx.test(newPassword)) {
          return res.status(400).json({
            message:
              "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.",
          });
        }
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (nickname) {
      const nicknameExist = await User.findOne({
        nickname,
        _id: { $ne: userID },
      });
      if (nicknameExist) {
        return res.status(400).json({
          message:
            "Your Nickname is Already Exist, Please Select another nickname",
        });
      }
    }

    if (name) {
      const nameExist = await User.findOne({ name, _id: { $ne: userID } });
      if (nameExist) {
        return res.status(400).json({
          message:
            "Your Username is Already Exist, Please Select another username",
        });
      }
    }

    user.name = name || user.name;
    user.nickname = nickname || user.nickname;

    user = await user.save();

    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error at Update User Function");
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
