import jwt from "jsonwebtoken";
import express, { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";

const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
  throw new Error(
    "Missing JWT secret key. Please set the JWT_SECRET_KEY environment variable."
  );
}

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can be more specific about the type of user if needed
    }
  }
}

export const authenticationJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decode = jwt.verify(token, JWT_SECRET);
      req.user = decode;
      next();
    } else {
      res.status(500).json({ login: false });
    }
  } catch (error) {
    res.status(402).json({ message: "authorization forbbiden" });
  }
};
