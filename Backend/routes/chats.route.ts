import express from "express";
import { authenticationJWT } from "../middleware/authentication";
import { chatRoom } from "../controller/chats.controller";
const router = express.Router();

router.get("/chats", authenticationJWT, chatRoom);

module.exports = router;
