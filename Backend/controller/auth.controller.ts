import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import express from "express";
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
  req: express.Request,
  res: express.Response
) => {
  try {
    let { username, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    let checkEmail = await prisma.user.findUnique({ where: { email } });
    let checkUsername = await prisma.user.findUnique({ where: { username } });

    if (checkUsername && checkEmail) {
      return res.status(400).json({ message: "Username and email are in use" });
    }

    if (checkUsername) {
      return res.status(400).json({ message: "Username not available" });
    }

    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let register = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json(register);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Login: RequestHandler<{}, {}, LoginRequetBody> = async (
  req: express.Request,
  res: express.Response
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

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      JwtSecretKey,
      {
        expiresIn: "2h",
      }
    );

    // res.cookie("token", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 2 * 60 * 60 * 1000,
    // });

    res.status(200).json({ message: "Logged in", refreshToken });
  } catch (error) {
    res.status(401).json({ message: "Internal server error" });
  }
};
