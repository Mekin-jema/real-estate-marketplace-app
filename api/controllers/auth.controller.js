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
    });
  }
  const hashedPassword = bcryptjs.hashSync(password);
  const newUser = await new User({ username, email, password: hashedPassword });
  const { password: pass, ...rest } = newUser._doc;

  try {
    await newUser.save();
    res.json({
      message: "User Created Successfully",
      user: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const singin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

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
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        currentUser: rest,
        message: "User Logged In Successfully",
      });
  } catch (error) {
    next(error);
  }
};
