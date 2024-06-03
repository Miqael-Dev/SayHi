import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface Request {
  user?: any;
}
export const chatRoom = async (req: express.Request, res: express.Response) => {
  try {
    const userEmail = req.user.email;
    const getUserInfo = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    res.status(200).json(getUserInfo);
  } catch (error) {
    res.status(500).json({ message: "User not authorized" });
  }
};
