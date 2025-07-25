import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { Pass_RegEx } from "../utils/constant.util.js";

const generateToken = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15d",
    });

    return accessToken;
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Failed to generate tokens");
  }
};

const setCookie = async (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  const { name, nickname, password } = req.body;

  try {
    const userExist = await User.findOne({ name });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const nicknameExist = await User.findOne({ nickname });
    if (nicknameExist) {
      return res.status(400).json({
        message:
          "Your Nickname is Already Exist, Please Select another nickname",
      });
    }

    if (!Pass_RegEx.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.",
      });
    }
    const user = await User({ name, nickname, password });

    const accessToken = generateToken(user._id);
    setCookie(res, accessToken);

    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        nickname: user.nickname,
      },
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log("Error at Sign Up Function");
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    if (!Pass_RegEx.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.",
      });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const checkPass = await user.comparePassword(password);

    if (!checkPass) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const accessToken = generateToken(user._id);
    setCookie(res, accessToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    console.log("Error at LogIn Function ", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    console.log("Error at Logout Function");
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
