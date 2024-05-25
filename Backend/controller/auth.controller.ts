import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const prisma = new PrismaClient();

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
  } catch (error) {
    res.status(500).json({ message: "user already exists" });
  }
};

export const Login: RequestHandler<{}, {}, LoginRequetBody> = async (
  req,
  res
) => {
  let { email, password } = req.body;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(500).json({ message: "user not registered" });
  }
};
