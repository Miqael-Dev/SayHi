require("dotenv").config();
// imports
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const authRouter = require("../routes/auth.route.ts");
const chatRouter = require("../routes/chats.route.ts");
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRouter);
app.use("/", chatRouter);

app.listen(PORT, () => {
  console.log("Server running at port: http://localhost:" + PORT);
});
