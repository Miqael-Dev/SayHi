import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const JwtSecretKey = process.env.JWT_SECRET_KEY;
const prisma = new PrismaClient();

if (!JwtSecretKey) {
  throw new Error(
    "Missing JWT secret key. Please set the JWT_SECRET_KEY environment variable."
  );
}
interface LoginRequetBody {
  email: string;
  password: string;
}
interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export const Signup: RequestHandler<{}, {}, SignupRequestBody> = async (
  req,
  res
) => {
  try {
    let { username, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    let register = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json(register);

    // let checkEmail = await prisma.user.findUnique({ where: { email } });
    // if (checkEmail) {
    //   return res.status(400).json({ message: "Email already exists" });
    // }

    // let checkUsername = await prisma.user.findUnique({ where: { username } });
    // if (checkUsername) {
    //   return res.status(400).json({ message: "Username not available" });
    // }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Login: RequestHandler<{}, {}, LoginRequetBody> = async (
  req,
  res
) => {
  try {
    let { email, password } = req.body;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(500).json({ message: "user not registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JwtSecretKey,
      {
        expiresIn: "2h",
      }
    );
    res.json({ message: "Logged in", token });
  } catch (error) {
    res.status(401).json({ message: "Internal server error" });
  }
};
