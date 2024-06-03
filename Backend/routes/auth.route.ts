import express from "express";
import { Signup, Login, Logout } from "../controller/auth.controller";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;
