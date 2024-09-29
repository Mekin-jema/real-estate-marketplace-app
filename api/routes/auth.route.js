import { signup, singin } from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", singin);

export default router;
