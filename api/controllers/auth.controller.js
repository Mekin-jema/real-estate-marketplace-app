import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      error: "Email is already taken",
      success: false,
    });
  }

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    const { password: pass, ...rest } = newUser._doc;
    await newUser.save();
    res.status(200).json({
      message: "User Created Successfully but not authenticated",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!email && !password) {
      return next(errorHandler(400, "email and password is mandatory"));
    }
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credential"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        currentUser: rest,
        success: true,
        message: "User Logged In Successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = userExist._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          currentUser: rest,
          success: true,
          message: "User Logged In Successfully",
        });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // generate random password for google user lentgh 16
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-5); // generate random username for google user
      const newUser = await new User({
        username,
        email,
        password: hashedPassword,
        photo,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = savedUser._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        currentUser: rest,
        success: true,
        message: "User Logged In Successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
