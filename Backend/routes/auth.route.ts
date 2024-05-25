import express from "express";
import { Signup } from "../controller/auth.controller";
const router = express.Router();

router.post("/signup", Signup);

module.exports = router;
