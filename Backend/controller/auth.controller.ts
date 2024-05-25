import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

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
