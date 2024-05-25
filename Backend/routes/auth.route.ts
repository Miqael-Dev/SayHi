import express from "express";
import { Signup, Login } from "../controller/auth.controller";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;
