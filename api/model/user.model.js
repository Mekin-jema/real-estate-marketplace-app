import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://www.google.com/imgres?q=avatar%20profile%20image&imgurl=https%3A%2F%2Ficons.veryicon.com%2Fpng%2Fo%2Fmiscellaneous%2Fuser-avatar%2Fuser-avatar-male-5.png&imgrefurl=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Fuser-avatar%2Fuser-avatar-male-5.html&docid=4jvd8jAseJx2eM&tbnid=McFiUIUoIlT17M&vet=12ahUKEwjFuvyk6-qIAxXNRPEDHQJGG3AQM3oECGQQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwjFuvyk6-qIAxXNRPEDHQJGG3AQM3oECGQQAA",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
