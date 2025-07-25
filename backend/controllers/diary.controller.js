import Diary from "../models/diary.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllDiaryUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const diary = await Diary.find({ user: userId }).sort({ createdData: -1 });
    return res.status(200).json({ diary });
  } catch (error) {
    console.log("Error in getAllDiaryUser controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createDiary = async (req, res) => {
  try {
    const { title, description, date, img } = req.body;
    const userId = req.user._id;

    if (!title || !description || !date) {
      return res.status(400).json({
        message: "Title, Description, and Date is mandatory for the Diary",
      });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newToDo = new Diary({
      title,
      description,
      date,
      img,
      user: userId,
    });

    await newToDo.save();

    res
      .status(201)
      .json({ message: "Diary Created Successfully", diary: newToDo });
  } catch (error) {
    console.log("Error in createDiary controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDiary = async (req, res) => {
  const diaryID = req.params.id;
  const userId = req.user._id;

  try {
    const diary = await Diary.findById(diaryID);
    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    if (!diary.user.equals(userId)) {
      return res
        .status(400)
        .json({ message: " You can't Delete Other User Diary" });
    }

    if (diary.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Diary.findByIdAndDelete(diaryID);

    res.status(200).json({ message: "Diary deleted successfully" });
  } catch (error) {
    console.log("Error in deleteDiary controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateDiary = async (req, res) => {
  const userId = req.user._id;
  const diaryId = req.params.id;
  const { title, description, date } = req.body;

  try {
    const diary = await Diary.findById(diaryId);

    if (!diary) {
      return res.status(404).json({ message: "Diary not found" });
    }

    if (!diary.user.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You can't update other user's diary" });
    }

    diary.title = title || diary.title;
    diary.description = description || diary.description;
    diary.date = date || diary.date;
    // if (img !== undefined) {
    //   const imgId = post.img.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(imgId);

    //   const uploadedResponse = await cloudinary.uploader.upload(img);
    //   img = uploadedResponse.secure_url;
    // }

    await diary.save();

    res.status(200).json({ message: "Diary updated successfully", diary });
  } catch (error) {
    console.log("Error in updateDiary controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
