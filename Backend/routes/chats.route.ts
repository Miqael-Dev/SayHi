import express from "express";
import { authenticationJWT } from "../middleware/authentication";
import { chatRoom } from "../controller/chats.controller";
const router = express.Router();

router.get("/", authenticationJWT, chatRoom);

module.exports = router;
