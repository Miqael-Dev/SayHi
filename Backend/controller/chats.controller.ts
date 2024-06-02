import express from "express";
export const getChats = (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Chats" });
};
