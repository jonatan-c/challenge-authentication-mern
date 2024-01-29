import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

import { Request, Response } from "express";
import { createAccessToken } from "../libs/jwt";
import { TOKEN_SECRET } from "../config";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    res.json(userSaved);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.json({
      data: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      },
      token,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req: any, res: Response) => {
  const token2 = req.header("Authorization");

  const token = token2?.split(" ")[1];
  // console.log("token", token);

  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error: any, user: any) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      data: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      },
      token,
    });
  });
};

export const profileUser = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id, { password: 0 });
    if (!user) return res.status(404).json("No user found");

    res.json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// export const logout = async (req, res) => {
//   res.cookie("token", "", {
//     httpOnly: true,
//     secure: true,
//     expires: new Date(0),
//   });
//   return res.sendStatus(200);
// };
