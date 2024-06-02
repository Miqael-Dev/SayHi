import express from "express";
import { authenticationJWT } from "../middleware/authentication";
import { getChats } from "../controller/chats.controller";
const router = express.Router();

router.get("/chats", getChats);

module.exports = router;
