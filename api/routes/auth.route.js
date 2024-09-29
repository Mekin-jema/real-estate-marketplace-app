import { signup } from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.get("/signup", signup);

export default router;
