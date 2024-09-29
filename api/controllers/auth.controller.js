import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
