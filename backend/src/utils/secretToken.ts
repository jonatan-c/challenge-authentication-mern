import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const createSecretToken = (id: any) => {
  return jwt.sign({ id }, TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
