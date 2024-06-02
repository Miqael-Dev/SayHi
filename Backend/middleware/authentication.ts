import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import express from "express";

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

interface protectedRequest extends express.Request {
  userId?: number;
}

export const authenticationJWT = (
  req: protectedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader?.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.userId = decoded.userId;
    next();
  });
};
