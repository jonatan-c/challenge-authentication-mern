import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const headerToken = req.header("Authorization");

    const token = headerToken?.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error: any, user: any) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }

      req.user = user;
      next();
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
