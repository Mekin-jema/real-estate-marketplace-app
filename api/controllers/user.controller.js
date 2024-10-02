import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = async (req, res) => {
  res.send("Hello World");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true }
    );

    // if (!updatedUser) {
    //   return next(errorHandler(404, "User not found"));
    // }

    // console.log(updatedUser);

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: rest,
    });
  } catch (error) {
    // next(errorHandler(500, "Server error", error));
    console.log(error);
  }
};
