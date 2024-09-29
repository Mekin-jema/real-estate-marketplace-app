import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      error: "Email is already taken",
    });
  }
  const hashedPassword = bcryptjs.hashSync(password);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json({
      message: "Signup success",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
