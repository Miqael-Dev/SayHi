require("dotenv").config();
// imports
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const authRouter = require("../routes/auth.route.ts");
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log("Server running at port: http://localhost:" + PORT);
});
